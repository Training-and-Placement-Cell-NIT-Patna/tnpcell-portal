'use strict';

/**
 *  company controller
 */


/*

This is a Node.js code written in the Strapi framework. 
It defines a custom controller for the 'company' entity 
that performs additional operations before saving a new company 
record to the database. The code uses the Strapi factory function createCoreController
 to create a new controller, and exports the resulting object.

The custom controller has one method register which handles
 the creation of a new company record. The method starts by checking
  that the request body contains data, and returns a 'bad request' error 
  if it does not. The method then sets the 'status' attribute to "pending" 
  (since it's not yet approved) and calls the built-in create method to save the new record to the database.

The register method provides a custom way to create company records that
 ensures that the records are created with a 'status' of 'pending' and 
 performs additional validation before saving to the database.


*/


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::company.company", ({ strapi }) => ({

  /** Authentication is needed for this. Only user with access >='coordinator' role should be granted permission
  *
  ** Requires request body is same as if passed to POST request to usual create entry through strapi REST api
  * ie. ctx.request.body should be like: { data: { 'company_name':'OSI','company_address': 'India' } }
  *
  * Using this route ensures some pre-save checks, such as status MUST be set to "pending" initially, not yet approved
  */
  async register(ctx) {
    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest(null, [{ messages: [{ id: "Invalid parameters/Failed to parse" }] }]);
    }

    // Ensure, sender did not sender with "status: approved"
    data["status"] = "pending";

    // NOTE: this may not be required, since we already modified ctx.request.body.data above
    ctx.request.body = { data };

    return await this.create(ctx);
  },
}));

// ex: shiftwidth=2 expandtab:
