module.exports = {
  routes: [
    {
      /*This route should be accessible by coordinator, and use this instead of strapi's default create route*/
      method: "POST",
      path: "/job/register",
      handler: "job.register",
      policies: [],
    },
    {
      /*This route should be accessible by coordinator, and use this instead of strapi's default create route*/
      method: "PUT",
      path: "/job/upload-jaf",
      handler: "job.upload_jaf",
      policies: [],
    },
  ]
}

// ex: shiftwidth=2 expandtab autoindent:
