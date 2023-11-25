'use strict';

const { helper_get_applications, helper_is_job_eligible } = require("./util");

module.exports = {


    /*


    This code exports two functions as an API in a Strapi 
    (a Node.js headless CMS) application. The first function, 
    get_eligible_jobs, retrieves a list of eligible jobs for a student
     user based on various eligibility criteria such as their academic
      records and approval status. The second function, get_all_jobs, 
      retrieves a list of all jobs based on the category the student is
       registered for. Both functions first verify if the user has
        provided a valid bearer token, then retrieve the student's information 
        from the database, and finally perform the relevant checks and return 
        the results in the response body. The functions use Strapi's query API
         to interact with the database and a helper function helper_is_job_eligible
          from a separate utility file for some of the eligibility checks.

    */


    /**
     * @description Searches the jobs db to look for eligible jobs for current student
     * 
     * @note There's also a similar API for admin, to get eligible jobs for a given roll number
     * @note The main logic, for whether student is eligible for a job is in helper_is_job_eligible
     * 
     * @checks
     * - student is logged in
     * - student record with roll number exists
     * - student is approved by admin
     * - student is eligible for job (see `helper_is_job_eligible`)
     * - job.job_status is "open"
     *
     * @returns Array of job objects, each object containing detail for one job
     */
    async get_eligible_jobs(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
        }
        const student_self = await strapi.db.query("api::student.student").findOne({
            where: {
                roll: user.username,
            },
            populate: ["program", "course", "department"]
        });
        if (!student_self) {
            return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
        }

        const { id, approved, X_marks, XII_marks, cpi} = student_self;

        if (approved !== "approved") {
            return ctx.badRequest(null, [{ messages: [{ id: "Account not approved yet" }] }]);
        }

        if (cpi === undefined) {
            return ctx.badRequest(null, [{ messages: [{ id: "CPI not updated yet" }] }]);
        }

        let eligible_jobs = await strapi.db.query("api::job.job").findMany({
            where: {
                min_X_marks: { $lte: X_marks },
                min_XII_marks: { $lte: XII_marks },
                min_cpi: { $lte: cpi },
                approval_status: "approved",
                job_status: "open",
                // category: registered_for,
            },
            populate: ["company", "jaf"]
        });

        if (!Array.isArray(eligible_jobs)) {
            return ctx.internalServerError(null, [{ messages: [{ id: "Could not get eligible jobs" }] }]);
        }

        // Check applications in which student has been selected
        const selected_applications = await strapi.db.query("api::application.application").findMany({
            where: {
                student: id,
                status: "selected"
            },
            populate: ["job"]
        });

        /**
         * `Array.filter` doesn't support async function write now, so using this 'trick'
         * 
         * @ref: https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
         */
        const is_eligible = await Promise.all(eligible_jobs.map(
            async (job) => {
                if ( job.job_status !== "open" ) {
                    // console.debug("Job not open");
                    return false /* Job is not open for applications */;
                }

                return await helper_is_job_eligible(student_self, job, selected_applications);
            })
        );

        eligible_jobs = eligible_jobs.filter((_, index) => is_eligible[index]);

        ctx.body = eligible_jobs;
    },

    /**
//  @description Searches all jobs according to registered_for current student
 *
 * @notes
 * - Both RESUME & RESUME_LINK must be NOT null
 *
 * @returns Array of job objects, each object containing detail for one job
 */
    async get_all_jobs(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
        }
        const student_self = await strapi.db.query("api::student.student").findOne({
            where: {
                roll: user.username,
            },
            select: ["approved"]
        });
        if (!student_self) {
            return ctx.badRequest(null, [{ messages: [{ id: "No student found" }] }]);
        }

        const { approved} = student_self;

        if (approved !== "approved") {
            return ctx.badRequest(null, [{ messages: [{ id: "Account not approved yet" }] }]);
        }

        const all_jobs = await strapi.db.query("api::job.job").findMany({
            where: {
                // category: registered_for,
                approval_status: "approved",
            },
            populate: ["company", "jaf"]
        });
        // console.debug(all_jobs);

        ctx.body = all_jobs;
    },

    /**
     * @description Apply to a job passing the job id
     * @example http://localhost:1337/api/student/apply?jobId=2
     * @note requires authentication
     * @returns 200 status on success, else error codes possibly with a body {messages: [{id:'msg'}]}
     */
    async apply_to_job(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
        }

        const query = ctx.request.query;
        if (!query || !(query.jobId)) {
            return ctx.badRequest(null, [{ messages: [{ id: "Required jobId in query" }] }]);
        }

       const student_self = await strapi.db.query("api::student.student").findOne({
            where: {
                roll: user.username,
            },
            populate: ["program", "course", "department", "resume"]
        });
        if (!student_self) {
            return ctx.badRequest(null, [{ messages: [{ id: "No student found" }] }]);
        }

        // NOTE: The "id" here maybe different than user.id,
        // since that refers to id in Users collection, 
        // and this is in the Students collection
        const { id, approved, resume, resume_link } = student_self;
        if (approved !== "approved") {
            return ctx.badRequest(null, [{ messages: [{ id: "Account not approved yet" }] }]);
        }

        if (resume == null || resume_link == null) {
            return ctx.badRequest(null, [{ messages: [{ id: "Resume/Resume_Link not set" }] }]);
        }

        const job = await strapi.db.query("api::job.job").findOne({
            where: {
                id: query.jobId,
            },
            populate: true
        });

        if (!job) {
            return ctx.badRequest(null, [{ messages: [{ id: "No such job Id found" }] }]);
        }

        // Check applications in which student has been selected
        const selected_applications = await strapi.db.query("api::application.application").findMany({
            where: {
                student: id,
                status: "selected"
            },
            populate: ["job"]
        });

        const is_eligible = await helper_is_job_eligible(student_self, job, selected_applications);
        if (!is_eligible) {
            return ctx.badRequest(null, [{ messages: [{ id: "Not eligible" }] }]);
        }

        /* Eligible, as above conditions are all satisfied */
        const application = await strapi.db.query("api::application.application").create({
            data: {
                status: "applied",
                student: id,
                job: query.jobId
            },
            populate: ["job"]
        });

        if (!application) {
            return ctx.internalServerError(null, [{ messages: [{ id: "Failed to create application" }] }]);
        }

        ctx.body = application;
    },

    /**
     * @description Searches the applications collection to look for applied jobs for current student
     * @example http://localhost:1337/api/student/applied-jobs
     * @note requires authentication
     * @returns Array of applications, each object containing application for one job
     */
    async get_applied_jobs(ctx) {
        const user = ctx.state.user;

        if (!user || !user.username) {
            return ctx.badRequest(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
        }
        const applied_jobs = await helper_get_applications(user.username);

        ctx.body = applied_jobs;
    },
};

// ex: shiftwidth=4 expandtab:

