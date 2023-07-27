const { helper_is_job_eligible, helper_get_applications } = require("../../student/controllers/util");
const AdmZip = require("adm-zip");
const { readFileSync } = require("fs");
const path = require("path");
const process = require("process");


/*

This code exports three asynchronous functions get_eligible_jobs, get_applied_jobs and download_selected_resumes 
as part of a Strapi (a Node.js based CMS) API for the "Admin" role.

get_eligible_jobs: This function is used to get the list of jobs that 
are eligible for a student based on the student's roll number. 
It takes the roll number from the URL query parameters and uses 
it to find the corresponding student record from the student collection in the database. 
If the student record is found, the function retrieves all job records from the
 job collection in the database where the minimum requirements are met 
 (minimum X_marks, XII_marks, cpi, and category). 
 Then, it checks if the student has already applied and been selected for any of these jobs. 
 If yes, those jobs are removed from the list of eligible jobs. Finally, 
 the remaining eligible jobs are returned as the response.

get_applied_jobs: This function returns a list of jobs that the student with the given roll number has applied to. 
It takes the roll number from the URL query parameters, finds the corresponding student record, 
and then retrieves all application records from the application collection in the database 
where the student is the applicant and the application status is "selected".

download_selected_resumes: This function returns a zip file containing the resumes of 
the selected students for a particular job. It takes the job id from the URL query parameters, 
finds the corresponding job record, and then retrieves all application records from the
 application collection in the database where the student is selected for the job. 
 The resumes of these students are then read from the file system, compressed into a zip file, 
 and returned as the response.

*/


module.exports = {

    /**
     * @description Searches the jobs db to look for eligible jobs for given roll number
     *
     * @auth Admin only
     *
     * @queryParam {String} roll
     * 
     * @note This is a duplicate API of student.get_eligible_jobs, this is for admin, to get eligible jobs for a given roll number
     * @note If you want to know more about the logic, see student.get_eligible_jobs
     *
     * @example http://localhost:3000/api/admin/job/get_eligible_jobs?roll=1
     * 
     * @returns Array of job objects, each object containing detail for one job
     */

    async get_eligible_jobs(ctx) {
        const { roll } = ctx.query;



        if (!roll) {
            return ctx.badRequest(null, [{ messages: [{ id: "Missing roll number", received_roll: roll || null }] }]);
        }

        const student_self = await strapi.db.query("api::student.student").findOne({
            where: {
                roll: roll,
            },
            populate: ["program", "course", "department"]
        });
        if (!student_self) {
            return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
        }

        const { id, approved, X_marks, XII_marks, cpi,
            //  registered_for
         } = student_self;

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
            async (job) => (await helper_is_job_eligible(student_self, job, selected_applications))
        ));

        eligible_jobs = eligible_jobs.filter((_, index) => is_eligible[index]);



        ctx.body = eligible_jobs;

    },

    /**
     * @description Searches the applications collection to look for applied jobs for given roll number
     * Note: This function can also be used in admin routes, eg.
     * 
     * @queryParam {String} roll
     * 
     * @example http://localhost:3000/api/admin/job/applied-jobs?roll=1
     * @auth Admin only
     * 
     * @note This is a duplicate API of student.get_applied_jobs, this is for admin
     * 
     * @returns Array of applications, each object containing application for one job
     */

    async get_applied_jobs(ctx) {

        const { roll } = ctx.query;

        if (!roll) {
            return ctx.badRequest(null, [{ messages: [{ id: "Missing roll number", received_roll: roll || null }] }]);
        }

        const applied_jobs = await helper_get_applications(roll);

        ctx.body = applied_jobs;
    },

    /**
     * @description Returns a zip of resumes of multiple students
     *
     * @queryParam {String} rolls - It should be a string, containing comma-separated roll numbers
     * @note Empty zip if rolls is empty, but atleast passed in query params
     *
     * @returns Zip of resumes of multiple students
     */

    async resume_zip(ctx) {
        const { rolls } = ctx.query;

        if (!rolls) {
            return ctx.badRequest(null, [{ messages: [{ id: "Missing rolls number", received_rolls: rolls || null }] }]);
        }

        let roll_arr = rolls.split(',').map(s => s.trim()).filter(s => (s.length!==0));

        // Removing duplicates from `roll_arr`
        roll_arr = roll_arr.filter((r,i) => roll_arr.indexOf(r) == i);

        // Creating an empty zip (in-memory)
        const zip = new AdmZip();
        // roll_arr.forEach is async, so using Promise.all
        await Promise.all(roll_arr.map(async (roll) => {
            // FUTURE: Truly using asynchronously can make the whole call faster
            const student = await strapi.db.query("api::student.student").findOne({
                where: {
                    roll: roll,
                },
                populate: ["resume"]
            });

            // If any student roll number is invalid, just return 400
            if (!student) {
                return ctx.badRequest(null, [{ messages: [{ id: `Student ${roll} not found` }] }]);
            }

            // Ignore if student has no resume

            if (student.resume) {

                /**
                 * Working:
                 * 1. student.resume.url is something like "/uploads/Resume_15984.pdf"
                 * 2. But that path is relative to `public` directory
                 * 3. On localhost, the public directory is at $ThisProjectRoot/public,
                 *    and can use relative path ../../../../public
                 * 4. But, that is only for localhost
                 * 5. Could not find a way in strapi to get the absolute path of the public directory
                 * 6. So, I used some hacky way, matlab the server runs at the root of the project,
                 *    ie. the process's Current Working Directory is the root of the project
                 * 7. So, path to public folder is `${process.cwd()}/public`
                 * 8. Then, simply add the resume url, we will get the absolute path to resume file
                 */


                const file_path = path.join(process.cwd(), "public", student.resume.url);
                const buff = readFileSync(file_path);
                // Name of the file is the roll number.pdf
                zip.addFile(`${roll}.pdf`, buff);
            }
        }));

        // FUTURE:
        // 1. Custom name ?
        // 2. Check if it fails ? Though even that case it's simply 500, and error will be on logs
        ctx.body = zip.toBuffer();
    }
};

// ex: shiftwidth=4 expandtab:
