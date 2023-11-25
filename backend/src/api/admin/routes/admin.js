module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/admin/register-with-role',
      handler: 'auth.register_with_role',
      config: {
        middlewares: ['plugin::users-permissions.rateLimit'],
        prefix: '',
      },
    },
    {
      method: 'GET',
      path: '/admin/eligiblejobs',
      handler: 'student.get_eligible_jobs',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/admin/appliedjobs',
      handler: 'student.get_applied_jobs',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/admin/resume-zip',
      handler: 'student.resume_zip',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/admin/get-eligible-students',
      handler: 'job.get_eligible_students',
      config: {
        policies: []
      }
    }
  ],
};


/*

This is a Node.js code snippet that exports an object with five different routes for an API endpoint.

The first route is a POST request to the path "/admin/register-with-role".

When this route is triggered, the function "auth.register_with_role" is executed as the handler.

The configuration for this route includes a middleware called "users-permissions.rateLimit", which is added via the "middlewares" key.

There is also a prefix key with a value of "" included in the configuration object.

The second route is a GET request to the path "/admin/eligiblejobs".

When this route is triggered, the function "student.get_eligible_jobs" is executed as the handler.

The configuration for this route includes an empty array under the "policies" key.

The third route is a GET request to the path "/admin/appliedjobs".

When this route is triggered, the function "student.get_applied_jobs" is executed as the handler.

The configuration for this route also includes an empty array under the "policies" key.

The fourth route is a GET request to the path "/admin/resume-zip".

When this route is triggered, the function "student.resume_zip" is executed as the handler.

The configuration for this route also includes an empty array under the "policies" key.

The fifth route is a GET request to the path "/admin/get-eligible-students".

When this route is triggered, the function "job.get_eligible_students" is executed as the handler.

The configuration for this route also includes an empty array under the "policies" key.

*/