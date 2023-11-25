* [Reject] `roll` should not be unique at beginning, since someone may send a fake request blocking actual student from registering. But after approval, it should be unique, that is, no other student registers with that roll
* [Reject] How to handle "job approval requests" and "student approval requests" ? Currently Request collection me ek student ka relation hai
* [Done] Password reset:
  Old: Either give current and new password. Or send request to admin... I think then admin will set a temporary password, then user can change by giving it and new passwords
  Proposed: Since 'User' password will have to be changed too, requires email sent.
  Just 'Making it work'(TM): Delete previous user object, create new 'User' object with new password, and replace with it in Student.user_relation
* [Done] "approved: created" maybe redundant, since just after register, user HAS to call submit-for-approval which sets approved: "pending"
* [Done] `role` needs to be asked from frontend side. Since, default role when using http://localhost:1337/api/auth/register-role or /api/local/auth/register is "Authenticated", so superadmin will have to change this role once approved

* [Done] Minimum Password length >=6
* [Done] Don't allow any change or get_eligible_jobs after 'Submit for approval'
* [Discussed] Coordinator usernames, they may have 2 accounts, one as student and one as coordinator
* [Discussed] When to allow changes to `profile_picture` and `current_sem` ?

* [Done] Admin: Disallow registrations
* [Done] Admin: Common collection for things like allow student registrations or allow CPI change by all students
* [Reject] Admin: Approving multiple students at a time. How should it take these ?
  Currently will be done one-by-one for each student on frontend

* [Done] upload on modify route
* [Done] applied jobs

* [Done] eligible jobs
* [Done] apply
* [Done] company component
* [Done] is approved company

* Shouldn't company "has many jobs", instead of "job belongs to one company" relation. If company is removed then all its jobs should also.

* About searching using javascript datetime, forums says this: (ref: https://forum.strapi.io/t/query-by-month-or-by-year-or-by-specific-day/3802/6):

> Let’s your timezone from server differs with 12 hours from database, then if you send the request from server with 2020-01-01T00:00:00, then in db it will search 2019-12-31T12:00:00.

* Abhi entries create krne ke liye do routes hai: `/student/submit-for-approval` aur `/company/register`, which take input and work exactly similar to default POST request to `/students` and to `/companies`, so instead of new routes, and taking care that permission is disabled for default routes, why not override the default routes themselves. Jaise ki `/api/students` pe POST request `student.submit_for_approval` kare

* [Done] Two ways to register coordinator:
  1. [Currently Implemented] Custom api on backend, accessing internal collections and classes to implement register and provide this functionality
  2. Two calls from frontend... Problem is if 1st call happens and 2nd doesn't, then there will be a zombie student user, which will need to be removed before another try to create user with same username.
     The calls -> /api/auth/local/register (default) + /api/admin/assign-role (custom implementation, modifying user-permissions collection)

* [Done] Job collection me 2 attributes hai: `status` and `job_status`, which to use ? Use job_status

* [Done] Remarks column private in student collection
* [Done] Remove logic to disallow internal registrations

* [Done] Good to have: Filter jobs by start_date also
* [Done] Job classifications to be: A1, A2, X
* [Done] Add logic to not count A1 applications that are in "rejected" status, IF THIS IS REQUIRED BY SPECS
* [Done] Add api for getting student's applications for admin
* [Done] Allow job to have multiple eligible_programs
* [Done] Separate is eligible logic into a different function
* [Done] EWS, PWD
* [Done] Use different function for checking eligibility in apply_job
* [Done] Settings
* [Done] Programs, Departments
* [Done] Create Program and Department relation in student [NOTE: Created a oneToMany relation from Program/Department -> Student]
* [Done] Remove login_plus_role, register_plus_role
* [Done] There are two get applications for student: applications.findMe, job.get_applied_jobs. Removed applications.findMe
* [Done] Zip of multiple resumes
* [Done] Resume must be in pdf. aisa koi rule ?
* [Done] Resume upload
* [Done] Eligibility
* [Done] Admin should get all eligible but not applied jobs, irrespective of job_status
* [Done] resume is MUST before applying
* [Done] jaf
* [Done] forgot password
* [Done] Should coordinator be allowed to edit JAF multiple times ? ie. if JAF already exist whether to allow changing the JAF ?
* Ek baar student me fields ke naam check kr le saare
* Backend me permissions check krle
* Code review ?

* [Done] Coordinator profiles added it can be fetch by year
* [Done] Student profile picture implemented on sidebar
