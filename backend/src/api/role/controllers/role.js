'use strict';

/**
 * A set of functions called "actions" for `role`
 */



/*

This code is a Strapi action for the "role" model. It exports a single function, get_role, 
which is used to retrieve a user's role information.

The function uses the Strapi framework to handle a RESTful API request and response. 
When a request is made to this endpoint, the function is executed and returns the role information for a user in the response body.

The function starts by checking if a JWT token is present in the request and if it is, 
it retrieves the username from the token stored in ctx.state.user.username.

Next, it queries the "plugin::users-permissions.user" collection in the database,
 searching for the user with the specified username. It populates the "role" field, which is a relation, and selects the username and email fields to be returned in the response.

The response body is set to the role information found for the user. If there is an error,
 it sets the response body to the error.

*/

module.exports = {
  /**
   * Basic logic is:
   * 1. Get username from JWT, ie. using ctx.state.user.username
   * 2. Query "plugin::users-permissions.user" collection with username, and populate 'role' field (since it's a relation, it won't be populated by default)
   * 
   * @returns Object like this: {
      "username": "XXXXXXX",
      "email": "XXXXXXX.XXXX.xx@xxxx.xx.xx",
      "role": {
          "id": 3,
          "name": "student",
          "type": "student",
      }
    }
   */
  get_role: async (ctx, next) => {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
      }

      /* NOTE: This collection can also be used to get current password hash, then see implementation of /api/auth/local,
         it contains function for comparing a plaintext and a hash, and changing password too*/
      const role = await strapi.query("plugin::users-permissions.user").findOne({
        where: { username: user.username },
        populate: ["role"],
        select: ["username","email"]  /** Not returning all fields, remove this line with select: [] to allow all */
        // NOTE: Don't add "role" in the select array, it will return nothing then
      });

      ctx.body = role;
    } catch (err) {
      ctx.body = err;
    }
  }
};
