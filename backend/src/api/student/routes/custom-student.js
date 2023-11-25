module.exports = {
  routes: [
    {
      method: "GET",
      path: "/student/me",
      handler: "student.findMe",
      policies: [],
    },
    {
      method: "POST",
      path: "/student/submit-for-approval",
      handler: "student.submit_for_approval",
      policies: []
    },
    {
      /** NOTE: Take special care of updating field names in this student.modify_multiple route, on every change to student schema :) */
      method: "PUT",
      path: "/student/modify",
      handler: "student.modify_multiple",
      policies: []
    },
    {
      method: "GET",
      path: "/student/alljobs",
      handler: "job.get_all_jobs",
      policies: [],
    },
    {
      method: "GET",
      path: "/student/eligiblejobs",
      handler: "job.get_eligible_jobs",
      policies: [],
    },
    {
      method: "POST",
      path: "/student/apply",
      handler: "job.apply_to_job",
      policies: [],
    },
    {
      method: "GET",
      path: "/student/applied-jobs",
      handler: "job.get_applied_jobs",
      policies: [],
    },
    {
      method: 'POST',
      path: '/student/register-student',
      handler: 'auth.register_student',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },
    {
      method: 'POST',
      path: '/student/request-password-change',
      handler: 'auth.request_password_change',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },
    {
      method: 'GET',
      path: '/student/placed-status',
      handler: 'student.get_placed_status',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },


    {
      method: 'GET',
      path: '/student/intern-status-2',
      handler: 'student.get_intern_status_2',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },


    {
      method: 'GET',
      path: '/student/intern-status-6',
      handler: 'student.get_intern_status_6',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },


    {
      method: 'GET',
      path: '/student/fte-status',
      handler: 'student.get_fte_status',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },


    {
      method: "PUT",
      path: "/student/set-placed-status",
      handler: "student.set_placed_status",
      policies: []
    },
    {
      method: "POST",
      path: "/students/profile-pic-url",
      handler: "student.getProfilePicUrl"
    }
  ],
};

// ex: shiftwidth=2 expandtab:
