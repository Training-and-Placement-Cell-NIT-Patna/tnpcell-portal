const { helper_is_job_eligible} = require("../../student/controllers/util");
const AdmZip = require("adm-zip");
const { readFileSync } = require("fs");
const path = require("path");
const process = require("process");
const student = require("./student");

/*

This code exports an object with two functions, get_eligible_students and get_applied_students.

The get_eligible_students function is used to get the list of eligible students for a particular job. It takes in the context object ctx as an argument.

It logs "Backend file working" to the console.
It extracts the jobId from the query parameters in the context object.
If the jobId is not present, it returns a bad request error with a message "Missing job id".
It queries the database for the job with the specified jobId using the Strapi ORM.
If the job is not found, it returns a not found error with the message "Job not found".
If the job is found, it extracts its details such as job title, approval status, job status, etc. and saves them to variables.
If the approval status of the job is not "approved", it returns a bad request error with the message "Job not approved yet".
It queries the database for all students.
If the students are not found, it returns an internal server error with the message "Could not get eligible students".
It calls the helper_is_job_eligible function with each student and job as arguments.
The helper_is_job_eligible function returns a boolean value indicating whether the student is eligible for the job or not.
The eligible students are filtered using the boolean values returned by the helper_is_job_eligible function.
The filtered list of eligible students is returned in the body of the context object.
The get_applied_students function is commented out and not implemented in this code.


*/


module.exports = {

	async get_eligible_students(ctx) {


		const { jobId } = ctx.query;

		if (!jobId) {
			return ctx.badRequest(null, [{ messages: [{ id: "Missing job id", received_jobId: jobId || null }] }]);
		}

		// console.log(3);

		const job_self = await strapi.db.query("api::job.job").findOne({
			where: {
				id: jobId,
			},
         populate: ["company"]
		});


		if (!job_self) {
			return ctx.notFound(null, [{ messages: [{ id: "Job not found" }] }]);
		}



		const {job_title, approval_status, job_status, classification, min_X_marks, min_XII_marks, category, start_date, min_cpi, only_for_pwd, only_for_ews, eligible_courses, only_for_female, company_category, industry_sector} = job_self;

		// console.log(job_title, approval_status, job_status, classification, min_X_marks, min_XII_marks, category, start_date, min_cpi, only_for_pwd, only_for_ews, eligible_courses, only_for_female, company_category, industry_sector)

		if (approval_status !== "approved") {
            return ctx.badRequest(null, [{ messages: [{ id: "Job not approved yet" }] }]);
        }

		// console.log(6);

		let eligible_students = await strapi.db.query("api::student.student").findMany({
			where: {
				roll: { $gte: -1 },
                // X_marks: { $gte: min_X_marks},
				// XII_marks: {$gte: min_XII_marks},
			    // cpi: {gte: min_cpi},
			    // approval_status: "approved",
			},
			populate: ["program", "course", "department"]
		});

		if (!Array.isArray(eligible_students)) {
            return ctx.internalServerError(null, [{ messages: [{ id: "Could not get eligible students" }] }]);
        }

		// console.log(eligible_students)

		selected_applications=[];

	//	eligible_Students = [];

		const is_eligible = await Promise.all(eligible_students.map(
			async (student) => (
				await helper_is_job_eligible(student, job_self, selected_applications))
		));

		eligible_students = eligible_students.filter((_, index) => is_eligible[index]);

		// console.log("this" + eligible_students);

		ctx.body=eligible_students;

		//	console.log(eligible_students);

		//	return job;

		//return eligible_students;

	},



    async get_applied_students(ctx) {
        const { jobId } = ctx.query;

        if (!jobId) {
            return ctx.badRequest(null, [{ messages: [{ id: "Missing Job Id", received_jobId: jobId || null }] }]);
        }

        const applied_students = await helper_get_applications1(jobId);

        ctx.body = applied_students;
    },

};