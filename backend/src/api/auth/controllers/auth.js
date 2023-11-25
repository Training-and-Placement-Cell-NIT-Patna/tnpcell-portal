'use strict';

/**
 * A set of functions called "actions" for `auth`
 */

module.exports = {
  /**
   * @description Route to reset password
   *
   * @auth Currently planned for 'student' and 'coordinator' roles only
   *
   * @note NOT FOR FORGOT PASSWORD currently, since this requires user to be logged in
   *
   * @request_body: { old_pass: string, new_pass: string }
   */



  /*

   
  This code is for a Strapi application and exports an object with two functions, reset_password and get_userid.

The reset_password function takes in a context ctx object from a Strapi 
route and is used to reset a user's password. It first checks if the user is authorized by 
checking the presence of a bearer token in the request header. If the token is not present, 
it returns an unauthorized error. If the token is present, it checks that the request body 
contains both an old_pass and a new_pass. If either of these is missing, it returns a bad request error. 
It then checks that the new password does not contain more than three times the symbol '$'. 
If the password passes this check, it retrieves the user's current hashed password from the 
database and checks that the old_pass matches the hashed password. If the old_pass is incorrect, 
it returns a forbidden error. If the old_pass is correct, it updates the user's password in the 
database with the new password.

The get_userid function is used to retrieve the id of a user based on the provided username. 
It first checks if the user is authorized by checking the presence of a bearer token in the request header. 
If the token is not present, it returns an unauthorized error. If the token is present, 
it checks if the user has the admin role. If the user does not have the admin role, 
it returns a forbidden error. If the user is authorized, it retrieves the user id 
from the database based on the provided username and returns it in an object.

*/


  reset_password: async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
    }

    const { old_pass, new_pass } = ctx.request.body;

    if (!old_pass || !new_pass) {
      return ctx.badRequest(null, [{ messages: [{ id: "Old password or new password not provided" }] }]);
    }

    // Throw an error if the new password selected by the user
    // contains more than three times the symbol '$'.
    if (
      strapi.service('plugin::users-permissions.user').isHashed(new_pass)
    ) {
      throw new ValidationError(
        'Your password cannot contain more than three times the symbol `$`'
      );
    }

    // curr_user is actually same as user, but with more fields. Since `user` doesn't have
    // the `password` field, we need to get it from `curr_user`.
    const curr_user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { id: user.id },
      select: ["password"]
    });

    const currentHashedPassword = curr_user.password;

    // console.debug({ currentHashedPassword, old_pass, new_pass, flag: await strapi.service('plugin::users-permissions.user').validatePassword(old_pass, currentHashedPassword) });

    // Throw an error if the old password is wrong.
    // @note: .validatePassword is defined in
    // `node_modules/@strapi/plugin-users-permissions/server/services/user.js`
    if (!(await strapi.service('plugin::users-permissions.user').validatePassword(old_pass, currentHashedPassword))) {
      return ctx.forbidden(null, [{ messages: [{ id: "Current/Old password is wrong" }] }]);
    }

    // Update the user's password.
    const edited_user = await strapi.service('plugin::users-permissions.user').edit( user.id, {
      // CAUTION: strapi v4.1.11 automatically hashes the password, updating strapi
      // may cause this to not work anymore, in that case see bcrypt.hashSync with
      // rounds=10, to ensure the password is hashed
      password: new_pass
    });

    return edited_user;
  },

  /**
   * @description Returns 'User' id, based on username
   * 
   * @auth Only for admin
   *
   * @param username
   *
   * @example GET /api/auth/userid?username=<username>
   */
  get_userid: async (ctx) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(null, [{ messages: [{ id: "Bearer Token not provided or invalid" }] }]);
    }

    if (user.role !== 'admin') {
      return ctx.forbidden(null, [{ messages: [{ id: "You are not authorized to perform this action" }] }]);
    }

    const { username } = ctx.query;

    if (!username) {
      return ctx.badRequest(null, [{ messages: [{ id: "Username not provided" }] }]);
    }

    const user_obj = await strapi.query('plugin::users-permissions.user').findOne({
      where: { username },
      select: ["id"]
    });

    if (!user_obj) {
      return ctx.badRequest(null, [{ messages: [{ id: "User not found" }] }]);
    }

    const userid = user_obj.id;

    return { id: userid };
  }
};

// ex: shiftwidth=2 expandtab:
