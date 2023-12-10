"use strict";

/**
 *  student controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::student.student", ({ strapi }) => ({
  /* Accessible only with proper bearer token
   */
  async findMe(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Bearer Token not provided or invalid" }] },
      ]);
    }
    const data = await strapi.db.query("api::student.student").findOne({
      populate: true,
      where: {
        roll: user.username,
      },
    });

    ctx.body = data;
  },

  /** Authentication is needed for this
   *
   * Note: Send data in JSON (not form-data), hence file uploads are NOT allowed on this route, use /student/modify route for that
   *
   ** Requires request body is same as if passed to POST request to usual create entry through strapi REST api
   * ie. ctx.request.body should be like: { data: {"name": "koi", "roll": "19023"} }
   *
   * This is for frontend to be independent of format that strapi requires
   *
   * Using this route ensures some pre-save checks, such as approved MUST not be able to set by student
   */
  async submit_for_approval(ctx) {
    const user = ctx.state.user;

    /* This is needed since only a signed in student should be able to send this + We need user.id later */
    if (!user || !user.username) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Bearer Token not provided or invalid" }] },
      ]);
    }

    {
      /** Check if administrator has blocked new registrations */
      const setting = await strapi.query("api::setting.setting").findOne({
        where: {},
      });
      if (!setting) {
        return ctx.internalServerError(null, [
          {
            messages: [
              {
                id: "Failed to get global settings for registrations allowed or not",
              },
            ],
          },
        ]);
      }

      if (setting["registrations_allowed"] == false) {
        return ctx.badRequest(null, [
          {
            messages: [
              {
                id: "Registrations are not allowed. Please contact Administrator",
              },
            ],
          },
        ]);
      }
    }

    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Invalid parameters/Failed to parse" }] },
      ]);
    }

    if (data["roll"] != user.username) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Username does not match with roll number" }] },
      ]);
    }

    // NOTE: Regarding 'department', 'program' and 'course', frontend itself will send ID,
    //       so just let it pass through to strapi

    // NOTE: This directly modifies the ctx.request.body["data"], which we want,
    // since ctx is to be passed to this.create

    {
      // Ensure, sender did not sender with "approved: approved"
      data["approved"] = "pending";

      // Ensure placed_status: "unplaced"
      data["placed_status"] = "unplaced";
    }

    // Give user id of related entry in Users collection, used for auth
    data["user_relation"] = user.id;

    ctx.request.body = { data };

    // File uploads are not allowed on this route, use /student/modify route for that
    ctx.request.files = {};

    return await this.create(ctx);
  },

  /**
   * @description Route to modify given keys for the current user
   *
   * @notes
   * - request body is slightly DIFFERENT than if passed to PUT request to strapi's REST apis
   * ie. ctx.request.body should be like: { "name":"Koi","roll": "1905050","resume": File }, ie. NOT like { "data": {"name": "koi"} }
   * This was made to accommodate both types of input, as body and form-data
   * - Request body must be 'multipart/form-data'
   * - Most fields cannot be updated after student clicks "Submit for approval"
   * - By default only selected fields at end of this function can be modified,
   *   ie. if a field name is not mentioned in this function, IT CANNOT BE CHANGED
   *
   * @auth Requires authentication with 'student' role
   */
  async modify_multiple(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Bearer Token not provided or invalid" }] },
      ]);
    }

    // console.log("Starting: ", { body: ctx.request.body, files: ctx.request.files, query: ctx.query });

    const roll = user.username;
    const body = ctx.request.body;
    if (!body || typeof body !== "object") {
      return ctx.badRequest(null, [
        { messages: [{ id: "Invalid parameters" }] },
      ]);
    }

    // console.debug({body, files: ctx.request.files, query: ctx.query});

    const student_data = await strapi.db.query("api::student.student").findOne({
      where: {
        roll: roll,
      },
      select: ["id", "approved"],
    });
    if (!student_data) {
      // Returning 500, since this should not fail, it's just reading data of an existing user (as they have been provided the JWT)
      return ctx.internalServerError(null, [
        { messages: [{ id: "Failed to fetch student data" }] },
      ]);
    }

    // Note: Intentionally not checking `approved`, since student can modify some fields
    const { id, approved } = student_data;

    /**
     * NOTE TO FUTURE DEVELOPERS:
     *
     * Currently we filter fields based on below arrays, ie. if ANY key is not in this array, it will simply be ignored, and hence not modifiable
     */
    // Most mandatory components locked after approval of the profile (ie. only allowed to change before approval).
    // CPI can be updated when allowed by admin

    // NOTE: These are not allowed to change, since student has already "submitted for approval"
    const fields_allowed_before_approval = [
      "name",
      "roll",
      "gender",
      "date_of_birth",
      "category",
      "rank",
      // "registered_for",
      "course",
      "address",
      "X_marks",
      "XII_marks",
      "ug_college",
      "ug_cpi",
    ];

    // should include at least ALL optional fields
    const fields_allowed_anytime = [
      "resume_link",
      "other_achievements",
      "projects",
      "transcript_link",
      "cover_letter_link",
    ];

    // Fields related to SPI and CPI, only allowed to be changed if Admin globally allows change to these
    const cpi_spi_fields = [
      "spi_1",
      "spi_2",
      "spi_3",
      "spi_4",
      "spi_5",
      "spi_6",
      "spi_7",
      "spi_8",
      "spi_9",
      "spi_10",
      "cpi",
    ];

    // NOTE: ALL other fields (including invalid/unknown) are removed, and treated as immutable
    // for changing password, use forgot password
    // NOTE2: Other approach can be allowing all except some
    const fields_to_modify = {};

    for (const field in body) {
      // These fields will only be added to `fields_to_modify` if account is not already approved/rejected
      if (fields_allowed_before_approval.includes(field)) {
        if (approved === "pending") {
          fields_to_modify[field] = body[field];
        } else {
          continue; // skip modifying fields that are not allowed after "Submit for approval"
        }
      } else if (fields_allowed_anytime.includes(field)) {
        fields_to_modify[field] = body[field];
      }
    }


    /** Check if Administrator has allowed changing SPIs and CPIs */
    const setting = await strapi.query("api::setting.setting").findOne({
      where: {},
    });
    if (!setting) {
      console.error(
        "[student: modify] Failed to get global settings for CPI change allowed or not"
      );
      console.error(
        "[student: modify]     Not responding with failure, since it by default won't be modifiable"
      );
      // return ctx.internalServerError(null, [{ messages: [{ id: "Failed to get global settings" }] }]);
    }

    // If allowed, allow fields given in `cpi_spi_fields` array to be modified
    if (setting["cpi_change_allowed"] == true) {
      for (const field in body) {
        // @check body[field] must be a number, else it is simply skipped
        if (
          cpi_spi_fields.includes(field) &&
          body[field] &&
          !isNaN(body[field])
        ) {
          fields_to_modify[field] = body[field];
        }
      }
    }

    /** All fields that take media
     * WHY: It is needed since from backend we are taking keys as, eg. "resume", but strapi's
     * update route requires this to be "files.resume", so instead of depending on frontend to
     * do this, I am separating this strapi-dependent logic from frontend, so this array will
     * be used to rename all media fields adding "files." to the beginning
     *
     * NOTE: This needs to be updated with every media field added to student schema
     */
    const media_fields = ["resume", "profile_pic","casteCertificate", "tenthCertificate", "twelthCertificate", "aadharCard", "panCard", "drivingLicence", "disabilityCertificate", "allSemMarksheet"];
    const files_to_upload = {};
    for (const field in ctx.request.files || {}) {
      if (media_fields.includes(field)) {
        // Delete "resume" field in student. ie. by setting resume: null
        const edited_student = await strapi.db
          .query("api::student.student")
          .update({
            where: { id: id },
            data: {
              [field]: null,
            },
          });
        // console.debug(edited_student);

        // Rename the file as `resume.pdf`
        if (field == "resume") {
          ctx.request.files[field].name = `${roll}.pdf`;
        }
        files_to_upload[`files.${field}`] = ctx.request.files[field];
      }
    }
    ctx.request.files = files_to_upload;

    // Modifying ctx.params according to input format taken by this.update function
    if (!ctx.params) {
      ctx.params = {};
    }
    ctx.params["id"] = id;

    // NOTE: Not allowing any user given query to pass through
    ctx.request.query = {};

    // console.log("Earlier, ctx.query", { q: ctx.query });

    // NOTE: Internally in strapi this 1 signifies replaceFile, it is like this in
    // node_modules/@strapi/plugin-upload/server/controllers/content-api.js
    // await (ctx.query.id ? this.replaceFile : this.uploadFiles)(ctx);
    // ctx.query = {id: 1, ...ctx.query};

    ctx.request.body = {
      // NOTE: Internally, strapi expects body["data"] to be a string like "{'data': {'key1:'3434','key2':6}}"
      data: JSON.stringify(fields_to_modify),
    };

    // console.log("Just before update: ", { body: ctx.request.body, files: ctx.request.files });

    if (fields_to_modify === {}) { // No fields to modify, ill resolve later
      ctx.response.status = 204;
      return (ctx.body = "No field modified");
    } else {
      // Pass to the `update` callback to handle request
      return this.update(ctx);
    }
  },

  /**
   * @description Returns whether a student is placed or not, if a roll given,
   * else returns results for all
   * @example http://localhost:1337/student/placed-status?roll=19cs11
   *          response: { placed: true }
   * @example http://localhost:1337/student/placed-status,
   *          response: { placed: { "placed_a1": ["19cs11", "19ec62"], "placed_a2": [...], "placed_x": [...] } }
   *
   * @note This doesn't return 'unplaced' student's rolls
   * @note There can be the case where student is selected in both A1 and A2, in that case
   * handle at frontend, which to show A1 or A2
   *
   * @note Conditions for being 'placed':
   * 1. On-campus selection: Logic is any application has status='selected',
   * but only category='FTE' AND classication is not 'none', since
   * classification 'none' is for internships
   * 2. Off-campus selection: Logic is the placed_status field in the student's
   * data is set to something other than 'unplaced'
   *
   * @returns { placed: boolean | [ [placed_status]: string ] }, If 'roll' given, then returns a
   * boolean (true/false denoting whether placed/not placed respectively). Else,
   * when 'roll' not given, returns an 'array of roll' for each placed_status
   * except 'unplaced'
   */

  async get_placed_status(ctx) {
    const query = ctx.request.query || {};

    const roll = query.roll;

    if (!roll) {
      // Get all roll numbers where the student is selected in some job
      const applications = await strapi.db
        .query("api::application.application")
        .findMany({
          where: {
            status: "selected",
            job: {
              category: "FTE",
              // @ref: Negation according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#not
              $not: {
                classification: "none",
              },
            },
          },
          populate: ["student", "job"],
        });

      const oncampus_placed = {
        placed_tier1: [],
        placed_tier2: [],
        placed_tier3: [],
      };

      // console.log("H1")
    
      applications.forEach((app) => {
        // Note: Assuming job.classification is one of "Tier1", "Tier2", "Tier3"
        oncampus_placed[`placed_${app.job.classification.toLowerCase()}`].push(
          app.student.roll
        );
      });

      // console.log("H2")

      // Get array of students who are NOT 'unplaced'
  
      const students = await strapi.db.query("api::student.student").findMany({
        where: {
          $not: {
            placed_status: "unplaced",
          },
        },
        select: ["roll", "placed_status"],
      });

      // const offcampus_placed = {
      //   placed_tier1: [],
      //   placed_tier2: [],
      //   placed_tier3: [],
      // };

      // students.forEach((student) => {
      //   // Note: Assuming student.placed_status is one of "placed_tier1", "placed_tier2", "placed_tier3"
      //   offcampus_placed[student.placed_status].push(student.roll);
      // });

      // console.log("H3")

      // merge unique rolls from oncampus_placed and offcampus_placed
      const placed_rolls = {
        placed_tier1: [
          ...new Set([
            ...oncampus_placed.placed_tier1,
            // ...offcampus_placed.placed_tier1,
          ]),
        ],
        placed_tier2: [
          ...new Set([
            ...oncampus_placed.placed_tier2,
            // ...offcampus_placed.placed_tier2,
          ]),
        ],
        placed_tier3: [
          ...new Set([
            ...oncampus_placed.placed_tier3,
            // ...offcampus_placed.placed_tier3,
          ]),
        ],
      };

      ctx.body = { placed: placed_rolls };
      return;
    }

    const student = await strapi.db.query("api::student.student").findOne({
      where: {
        roll: roll,
      },
      select: ["id", "placed_status"],
    });
    if (!student) {
      return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
    }

    // If placed_status already set, no need to query the applications, return
    if (student.placed_status != "unplaced") {
      ctx.body = { placed: true };
      return;
    }

    const selected_application = await strapi.db
      .query("api::application.application")
      .findOne({
        where: {
          student: student.id,
          status: "selected",
          job: {
            category: "FTE",
            // @ref: Negation according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#not
            $not: {
              classification: "none",
            },
          },
        },
      });

    if (selected_application) {
      ctx.body = { placed: true };
    } else {
      ctx.body = { placed: false };
    }
  },

  /**
   * @description Returns whether a student has an intern offer or not
   * @example http://localhost:1337/student/intern-status?roll=19cs11
   *
   * @note This function doesn't respect 'registered_for', for example, a
   * student registered for FTE, may also have his roll in the output, in case
   * he was selected in an intern or internship_status is true.
   * If needed, handle/filter according to that on frontend
   *
   * @note Conditions for having an 'intern offer':
   * 1. On-campus selection: Logic is any application has status='selected',
   * and either (category='FTE' AND classication='none') or (category='Intern')
   * 2. Off-campus selection: Logic is the intern_status field in the student's
   * data is set
   *
   * @returns { internship: boolean | [ string ] }, If 'roll' given, then returns a
   * boolean (true/false denoting whether got/no internship respectively). Else,
   * when 'roll' not given, returns an 'array of strings' representing roll
   * numbers of students who got internships
   */


  async get_intern_status_2(ctx) {

    const query = ctx.request.query || {};

    const roll = query.roll;
    if (!roll) {
      // Get all roll numbers where the student is selected in 2 month intern
      const applications = await strapi.db
        .query("api::application.application")
        .findMany({
          where: {
            status: "selected",
            job: {
              // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
              $or: [
                {
                  category: "Internship (2 Month)",
                  classification: "none",
                },
                {
                  category: "Internship (2 Month)",
                },
              ],
            },
          },
          populate: ["student"],
        });

      const oncampus_intern = applications.map((app) => app.student.roll);

      // Get array of students who have got an internship
      const students = await strapi.db.query("api::student.student").findMany({
        where: {
          internship_status_2: true,
        },
        select: ["roll"],
      });

      const offcampus_intern = students.map((student) => student["roll"]);

      // merge unique rolls from oncampus_placed and offcampus_placed
      const intern_rolls = Array.from(
        new Set([...oncampus_intern, ...offcampus_intern])
      );

      ctx.body = { internship: intern_rolls };
      return;
    }

    const student = await strapi.db.query("api::student.student").findOne({
      where: {
        roll: roll,
      },
      select: ["id", "internship_status_2"],
    });
    if (!student) {
      return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
    }

    // If intern selected, no need to query the applications, return
    if (student.internship_status_2 == true) {
      ctx.body = { internship: true };
      return;
    }

    const selected_application = await strapi.db
      .query("api::application.application")
      .findOne({
        where: {
          student: student.id,
          status: "selected",
          job: {
            // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
            $or: [
              {
                category: "Internship (2 Month)",
                classification: "none",
              },
              {
                category: "Internship (2 Month)",
              },
            ],
          },
        },
      });

    if (selected_application) {
      ctx.body = { internship: true };
    } else {
      ctx.body = { internship: false };
    }
  },



  async get_intern_status_6(ctx) {

    const query = ctx.request.query || {};

    const roll = query.roll;
    if (!roll) {
      // Get all roll numbers where the student is selected in 2 month intern
      const applications = await strapi.db
        .query("api::application.application")
        .findMany({
          where: {
            status: "selected",
            job: {
              // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
              $or: [
                {
                  category: "Internship (6 Month)",
                  classification: "none",
                },
                {
                  category: "Internship (6 Month)",
                },
              ],
            },
          },
          populate: ["student"],
        });

      const oncampus_intern = applications.map((app) => app.student.roll);

      // Get array of students who have got an internship
      const students = await strapi.db.query("api::student.student").findMany({
        where: {
          internship_status_6: true,
        },
        select: ["roll"],
      });

      const offcampus_intern = students.map((student) => student["roll"]);

      // merge unique rolls from oncampus_placed and offcampus_placed
      const intern_rolls = Array.from(
        new Set([...oncampus_intern, ...offcampus_intern])
      );

      ctx.body = { internship: intern_rolls };
      return;
    }

    const student = await strapi.db.query("api::student.student").findOne({
      where: {
        roll: roll,
      },
      select: ["id", "internship_status_6"],
    });
    if (!student) {
      return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
    }

    // If intern selected, no need to query the applications, return
    if (student.internship_status_6 == true) {
      ctx.body = { internship: true };
      return;
    }

    const selected_application = await strapi.db
      .query("api::application.application")
      .findOne({
        where: {
          student: student.id,
          status: "selected",
          job: {
            // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
            $or: [
              {
                category: "Internship (6 Month)",
                classification: "none",
              },
              {
                category: "Internship (6 Month)",
              },
            ],
          },
        },
      });

    if (selected_application) {
      ctx.body = { internship: true };
    } else {
      ctx.body = { internship: false };
    }
  },







  async get_fte_status(ctx) {

    const query = ctx.request.query || {};

    const roll = query.roll;
    if (!roll) {
      // Get all roll numbers where the student is selected in 2 month intern
      const applications = await strapi.db
        .query("api::application.application")
        .findMany({
          where: {
            status: "selected",
            job: {
              // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
              $or: [
                {
                  category: "FTE",
                  classification: "none",
                },
                {
                  category: "FTE",
                },
              ],
            },
          },
          populate: ["student"],
        });

      const oncampus_fte = applications.map((app) => app.student.roll);

      // Get array of students who have got an internship
      const students = await strapi.db.query("api::student.student").findMany({
        where: {
          fte_status: true,
        },
        select: ["roll"],
      });

      const offcampus_fte = students.map((student) => student["roll"]);

      // merge unique rolls from oncampus_placed and offcampus_placed
      const fte_rolls = Array.from(
        new Set([...oncampus_fte, ...offcampus_fte])
      );

      ctx.body = { fte: fte_rolls };
      return;
    }

    const student = await strapi.db.query("api::student.student").findOne({
      where: {
        roll: roll,
      },
      select: ["id", "fte_status"],
    });
    if (!student) {
      return ctx.notFound(null, [{ messages: [{ id: "Student not found" }] }]);
    }

    // If intern selected, no need to query the applications, return
    if (student.fte_status == true) {
      ctx.body = { fte: true };
      return;
    }

    const selected_application = await strapi.db
      .query("api::application.application")
      .findOne({
        where: {
          student: student.id,
          status: "selected",
          job: {
            // @ref: OR according to https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#or
            $or: [
              {
                category: "FTE",
                classification: "none",
              },
              {
                category: "FTE",
              },
            ],
          },
        },
      });

    if (selected_application) {
      ctx.body = { fte: true };
    } else {
      ctx.body = { fte: false };
    }
  },




  /**
   * @description Set 'placed_status' field for a student (usually when they get
   * placed off-campus).
   * A separate API was needed to ensure that placed_status and
   * placed_status_updated are set simulataneously
   *
   * @auth admin
   *
   * @note Setting to 'unplaced' is also allowed
   *
   * @example PUT
   * http://localhost:1337/student/set-placed-status?roll=19cs11&placed_status=placed_a2
   */
  async set_placed_status(ctx) {
    const query = ctx.request.query;

    if (!query || !query.roll || !query.placed_status) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Roll or placed_status not passed" }] },
      ]);
    }

    const { roll, placed_status } = query;

    if (
      ["placed_tier1", "placed_tier2", "placed_tier3", "unplaced"].includes(
        placed_status
      ) === false
    ) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Invalid placed_status" }] },
      ]);
    }

    await strapi.db.query("api::student.student").update({
      where: { roll: roll },
      data: {
        placed_status: placed_status,
        placed_status_updated: new Date(),
      },
    });

    ctx.body = { placed_status: placed_status };
  },

  async getProfilePicUrl(ctx) {
    const { email } = ctx.request.body;
    if(!email){
      return ctx.badRequest(null, [
        { messages: [{ id: "Email not passed" }] },
      ]);
    }
    const student = await strapi.db.query("api::student.student").findOne({
      where: {
        institute_email_id: email,
      },
      populate: true
    });
    if (!student) {
      return ctx.notFound('Student not found');
    }
    const profilePicUrl = student.profile_pic
    return { profilePicUrl };
  },
}));

// ex: shiftwidth=2 expandtab:
