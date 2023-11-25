/* Code taken from and modified of 'registered' function, in node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js
 *
 * Reference for this: https://gist.github.com/bibekgupta3333/7c4d4ec259045d7089c36b5ae0c4e763#file-strapi_v4_user_register_override-js
 *
 * Modified to ensure username (ie. the roll number) of student matches given regex
 */
'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const utils = require('@strapi/utils');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;



/*

The code is a Node.js script for a Strapi (a headless CMS) plugin for user registration, 
modified to add extra functionality for student registration. 
It includes functionality to verify that the username (expected to be a roll number in this case) 
follows a specific format, the password meets certain requirements, and the email address is valid.

Once the parameters passed in the request body are validated, the role is set to "student" as 
it's a public API. Then the corresponding role id is retrieved from the "plugin::users-permissions.role" 
collection to be set for the newly registered user.
 The new user is then saved in the "plugin::users-permissions.user" collection.

Finally, a JSON web token (JWT) is generated and signed with the 
payload (user data) and a secret, and returned in the response to the client.

*/

// const emailRegExp =
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRegExp = /.*/;

// ie. Roll number regex as suggested by Mayank sir

// const userNameRegExp =
//   /^[0-9]{4}[a-zA-Z]{2}[0-9]{2}$/;

const userNameRegExp = /.*/;

async function sanitizeUser(user, ctx) {
  // NOTE: @adig Returning role too, with the user
  const { role } = user;
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return { role, ...(await sanitize.contentAPI.output(user, userSchema, { auth })) };
};

// validation
const { yup, validateYupSchema } = require('@strapi/utils');
const registerBodySchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const validateRegisterBody = validateYupSchema(registerBodySchema);

// JWT issuer
function issueJWT(payload, jwtOptions = {}) {
  _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
  return jwt.sign(
    _.clone(payload.toJSON ? payload.toJSON() : payload),
    strapi.config.get('plugin.users-permissions.jwtSecret'),
    jwtOptions
  );
};

// @adig Reference: node_modules/@strapi/plugin-users-permissions/server/utils/index.js
const getService = name => {
  return strapi.plugin('users-permissions').service(name);
};

module.exports = {
  /**
   * @description Sign Up/Register route for student
   *
   * @auth Accessible by Public/Everyone
   *
   * @note- The request body is expected to be exactly SAME as if passed to /api/auth/local
   */
  register_student: async (ctx) => {
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const settings = await pluginStore.get({
      key: 'advanced',
    });

    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    const params = {
      ..._.omit(ctx.request.body, [
        'confirmed',
        'confirmationToken',
        'resetPasswordToken',
      ]),
      provider: 'local',
    };

    await validateRegisterBody(params);

    // Throw an error if the password selected by the user
    // contains more than three times the symbol '$'.
    if (
      strapi.service('plugin::users-permissions.user').isHashed(params.password)
    ) {
      throw new ValidationError(
        'Your password cannot contain more than three times the symbol `$`'
      );
    }

    /** NOTE: @adig: role is fixed as "student" since this is a Public API,
     * see admin's register-with-role for better control API */

    const role = "student";

    const role_entry = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: role }, select: ["id"] });

    if (!role_entry) {
      // `${role}` role doesn't exist in user-permissions collection
      throw new ValidationError("Please provide a valid role");
    }

    const role_id = role_entry.id;

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(params.email);

    if (isEmail) {
      params.email = params.email.toLowerCase();
    } else {
      throw new ValidationError('Please provide a valid email address');
    }

    // Check if the provided roll number (passed in params.username) is valid or not.
    const isValidRoll = userNameRegExp.test(params.username);

    if (!isValidRoll) {
      throw new ValidationError('Please provide a valid roll number');
    }

    params.role = role_id;

    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: params.email },
    });

    if (user && user.provider === params.provider) {
      throw new ApplicationError('Email is already taken');
    }

    if (user && user.provider !== params.provider && settings.unique_email) {
      throw new ApplicationError('Email is already taken');
    }

    try {
      if (!settings.email_confirmation) {
        params.confirmed = true;
      }

      // NOTE: @adig: Adding "populate: role" here
     const user = await getService('user').add(params);
      /*
       * The below creates the user, but password won't match
       * const user = await strapi
       * .query('plugin::users-permissions.user')
       * .create({ data: params, populate: ["role"] });
       */

      const sanitizedUser = await sanitizeUser(user, ctx);
      // console.log('User Data', user);

      if (settings.email_confirmation) {
        try {
          await strapi
            .service('plugin::users-permissions.user')
            .sendConfirmationEmail(sanitizedUser);
        } catch (err) {
          throw new ApplicationError(err.message);
        }

        return ctx.send({ user: sanitizedUser });
      }

      const jwt = issueJWT(_.pick(user, ['id']));

      return ctx.send({
        jwt,
        user: sanitizedUser,
      });
    } catch (err) {
      if (_.includes(err.message, 'username')) {
        throw new ApplicationError('Username already taken');
      } else {
        console.error(err);
        throw new ApplicationError('Some error occurred (maybe Roll/Email is already taken)');
      }
    }
  },

  /**
   * @description "Forgot Password"/"Request for password change" route for student
   * @auth Accessible by Public/Everyone
   *
   * @example POST /api/student/request-password-change
   *
   * @body { institute_email_id: string, roll: string }
   *
   * @note Just taking both email and roll, to prevent anyone from creating too many requests for other roll numbers
   */

  async request_password_change(ctx) {
    const { institute_email_id, roll } = ctx.request.body;

    if (!institute_email_id || !roll) {
      return ctx.badRequest(null, [{ messages: [{ id: "Required roll and email" }] }]);
    }

    const student = await strapi.db.query("api::student.student").findOne({
      where: { roll: roll, institute_email_id: institute_email_id },
      select: ["id"]
    });

    if (!student) {
      return ctx.badRequest(null, [{ messages: [{ id: "Student not found/Roll and Email don't match" }] }]);
    }

    // update student's password_change_requested field to true
    const updated = await strapi.db.query("api::student.student").update({
      where: { id: student.id },
      data: { password_change_requested: true }
    });

    if (!updated) {
      return ctx.internalServerError(null, [{ messages: [{ id: "Error updating student" }] }]);
    }

    return ctx.body = { message: "Password change request sent" };
  }
};

// ex: shiftwidth=2 expandtab:
