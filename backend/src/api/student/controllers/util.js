'use strict';

/**
 * @description Wrapper for console.debug
 * @need With help of this we can just comment this console.debug and all debug statements will be off
 */
function debug_reason(reason) {
    console.debug("Ineligible reason: ", reason);
}

module.exports = {
    /**
     * Helper function to check if a student is eligible for a job
     * 
     * @param {Student} student Student data
     * @param {Job} job Job object which has to be checked 
     * @param {[Application]} selected_applications
     * - Array of applications, for which "the current student" has already been selected
     * 
     * @notes
     * - IMPORTANT NOTE: Must check for job_status before calling this function
     *   This is because admin requires that this returns true even if job_status:closed
     * - All parameters are mandatory
     * - Some fields in student collection are relations, so they need to be populated,
     *   eg. student.course
     * - selected_applications should contain "all" applications for which the student has
     *   already been selected, irrespective of any other condition, eg. FTE/Internship
     *   Example:
     *       const selected_applications = await strapi.db.query("api::application.application").findMany({
     *         where: {
     *             student: id,
     *             status: "selected"
     *         },
     *         populate: ["job"]
     *       });
     * 
     * @assumptions
     * - job.eligible_courses is a string of comma-separated course IDs, eg. "1,2,5"
     * - job status terminology:
     *   - "open" - job is open for new applications
     *   - "ongoing" - no more applications, selection in process for older ones
     *   - "results_declared" - no more applications, results are declared
     *   - "abandoned" - no more applications, job is abandoned
     * 
     * @checks
     * To be eligible for a job:
     * - job minimum marks are less than or equal to student's marks, X, XII, CPI
     * - job is eligible for student's course
     * - job category matches student's registerd_for category, eg. Internship/FTE
     * - job is approved by admin
     * - job start datetime is less than current datetime
     * - job last datetime is greater than current datetime
     * - job is not already applied by student
     * - If job.only_for_ews, then only EWS students are eligible
     * - If job.only_for_pwd, then only PWD students are eligible
     * - If job.only_for_female, then only Female students are eligible
     * - If already selected in an "Internship" then ineligible for other "Internships"
     *
     * More conditions for "FTE" Jobs based on past applications:
     * - 1. If job.classification is "X", then the 'below' 3 conditions will be null and void
     * - 2. If selected in X or A1 => out of placement, not eligible (clarification: any number of times, because the below conditions don't apply)
     * - 3. If selected in A2, then 3 more A1 applications allowed, AFTER selected in A2
     * - 4. If student receives 2 offers, not eligible for more applications
     *
     * Note: The above checks will also include considering the "placed_status" in student
     *
     * @returns {boolean} If the student is eligible, this will return true
     */
    async helper_is_job_eligible(student, job, selected_applications) {
        // Instead of silently returning false, I am throwing an error, this may
        // cause some 500s initially, but will likely reduce silent eligibility
        // bugs in the long run
        const { id, X_marks, XII_marks, cpi, registered_for, course, placed_status, placed_status_updated, internship_status } = student;
        // if (!id || !X_marks || !XII_marks || !cpi || !registered_for || !course ) {
        //     throw `Some mandatory parameters not passed, or are null: ${student, job}`;
        // }
        if (!id || !X_marks || !XII_marks || !cpi  ) { //@very @important
            throw `Some mandatory parameters not passed, or are null: ${student, job}`;
        }

        {
            // Basic job status checks
            if (job.approval_status != "approved") {
                debug_reason("Job not approved");
                return false /* Job has not yet been approved */;
            }

            /*
             * This should be checked before calling this function
                if (job.job_status != "open") {
                    debug_reason("Job not open");
                    return false;
                }
            */
        }

        {
            // Basic qualification checks
            if (job.min_X_marks > X_marks) {
                debug_reason("X marks not sufficient");
                return false /* Xth marks less than minimum required */;
            }

            if (job.min_XII_marks > XII_marks) {
                debug_reason("XII marks not sufficient");
                return false /* XIIth marks less than minimum required */;
            }

            if (job.min_cpi > cpi) {
                debug_reason("CPI not sufficient");
                return false /* CPI less than minimum required */;
            }

            if (job.category != registered_for) {
                debug_reason("Job category does not match student's registered_for");
                return false /* Job's category is not the one student registered for */;
            }

            if(job.only_for_ews) {
                if(student.category != "ews") {
                    debug_reason("Job only for EWS");
                    return false /* Job only for EWS */;
                }
            }

            if(job.only_for_pwd) {
                if(student.pwd == false) {
                    debug_reason("Job only for PWD");
                    return false /* Job only for PWD */;
                }
            }

            if(job.only_for_female) {
                if(student.gender != "female") {
                    debug_reason("Job only for Female");
                    return false /* Job only for Female */;
                }
            }
       }

        {
            // Filter based on job.eligible_courses
            if (job.eligible_courses) {
                const eligible_course_ids = job.eligible_courses.split(",").map(id => parseInt(id.trim()));
                if (!eligible_course_ids.includes(course.id)) {
                    debug_reason("Course not eligible");
                    return false /* Student's course is not eligible for this job */;
                }
            }
        }

        {
            // Filter based on job.start_date and job.last_date
            try {
                // If job.start_date is not empty, then check if it's in the future, if so return false
                if (job.start_date) {
                    let start_date = new Date(job.start_date);
                    if (start_date > new Date()) {
                        debug_reason("Job not yet started");
                        return false /* Start date yet to reach */;
                    }
                }

                if (job.last_date) {
                    let last_date = new Date(job.last_date);

                    if (last_date < Date.now()) {
                        debug_reason("Job already ended");
                        return false /* Last date has passed */;
                    }
                }
            } catch (e) {
                console.error(
                    `WARNING: Job start_date or last_date is not a valid date:`,
                    `${job.start_date} or ${job.last_date}`
                );
            }
        }

        {
            // Check if student has already applied to this job
            const existing_application = await strapi.db.query("api::application.application")
                .findOne({
                    where: {
                        student: id,
                        job: job.id,
                    },
                });

            if (existing_application) {
                debug_reason("Student already applied to this job");
                return false /* Already applied */;
            }
        }

	if ( job.category == "Internship" ) {
            const existing_internship_selection = selected_applications
                .find(appl => appl.job.category == "Internship");

            if (existing_internship_selection || (internship_status === true)) {
                debug_reason("Student already selected in an Internship");
                return false /* Already selected in an Internship */;
            }
	}

        if ( job.category == "FTE" ) {
            if ( job.classification == "none" ) {
                const existing_internship_selection = selected_applications
                    .find(appl => (appl.job.category == "FTE" && appl.job.classication == "none"));

                if (existing_internship_selection || (internship_status === true)) {
                    debug_reason("Student already selected in an Internship");
                    return false /* Already selected in an Internship */;
                }
            }

            // Check the extra conditions, based on already selected applications
            // console.debug({ selected_applications });

            // Date at which student was first selected in A2 (if any)
            const first_A2_application = selected_applications.find(appl => appl.job.classification === "A2") || null;

            // When placed in A2 offcampus, we are using the
            // "placed_status_updated" field also
            // NOTE: When Date.parse fails, it returns NaN
            let offcampus_A2_placed_date = (placed_status === "placed_a2") ? (Date.parse(placed_status_updated) || null) : null;

            let oncampus_A2_placed_date = (first_A2_application) ? (Date.parse(first_A2_application.createdAt)): null;

            let date_A2_selection = null;

            // Taking the first out of both dates
            if ( oncampus_A2_placed_date && offcampus_A2_placed_date && (offcampus_A2_placed_date < oncampus_A2_placed_date) ) {
                date_A2_selection = offcampus_A2_placed_date;
            } else {
                // Since, either one or both are null, or
                // oncampus_A2_placed_date is earlier, either way, it has higher
                // precedence, but if null, use offcampus_A2_placed_date
                date_A2_selection = oncampus_A2_placed_date || offcampus_A2_placed_date;
            }

            // Number of applications to A1 jobs created by student, AFTER being selected in an A2 job
            // FUTURE: This calculation will get repeated for all jobs, see if it can be optimised
            const num_new_A1_application = (await strapi.db.query("api::application.application").findMany({
                where: {
                    student: id,
                    job: { classification: "A1" }
                },
            })).filter(application => {
                if (date_A2_selection) {
                    return Date.parse(application.createdAt) > date_A2_selection;
                }
                // returning false by default, since this application is BEFORE selection in A2, not new (after)
                return false;
            }).length;

            const already_selected_A1 = placed_status === "placed_a1" || (
                selected_applications
                    .find(appl => appl.job.classification === "A1") !== undefined
            );

            const already_selected_X = placed_status === "placed_x" || (
                selected_applications
                    .find(appl => appl.job.classification === "X") !== undefined
            );

            // Ensure condition 1 in "More conditions"
            if (job.classification === "X") {
                return true;
            }

            // Ensure condition 2 in "More conditions"
            if (already_selected_A1 || already_selected_X) {
                debug_reason("Student already selected in an A1 or X job");
                return false;
            }

            // Ensure condition 3 in "More conditions".
            if (first_A2_application != null || placed_status === "placed_a2") {
                // If selected in A2 already, then other A2 jobs not eligible now
                if (job.classification === "A2") {
                    debug_reason("Student already selected in an A2 job");
                    return false;
                }

                // Checking for 3 A1 applications condition
                if (num_new_A1_application >= 3) {
                    debug_reason("Student has already selected 3 A1 jobs");
                    return false;
                }
            }

            // Ensures condition 4 in "More conditions"
            if (selected_applications.length >= 2) {
                // Not eligible in any jobs
                debug_reason("Student has already been selected in 2 jobs");
                return false;
            }
        }

        return true /* All above conditions have passed */;
    },

    /**
     * Helper Function: To get applications of student, to tell which jobs the student has applied to,
     * (regardless of the application status)
     * 
     * Note: This function can also be used in admin routes, eg. /api/admin/job/applied-jobs?roll=190430
     * 
     * @param {string/number} roll - Roll number of the student, whose applications are to be fetched 
     * @returns 
     */
    async helper_get_applications(roll) {
        const student_self = await strapi.db.query("api::student.student").findOne({
            where: {
                roll: roll,
            },
            select: ["id", "approved"]
        });
        if (!student_self) {
            return []; // "No student found"
        }

        const { id, approved } = student_self;

        if (approved !== "approved") {
            return []; // "Student not approved"
        }

        const applied_jobs = await strapi.db.query("api::application.application").findMany({
            where: {
                student: id,
            },
            populate: ["student", "job.company", "job.jaf"]
        });

        return applied_jobs;
    },
};

// ex: shiftwidth=4 expandtab: