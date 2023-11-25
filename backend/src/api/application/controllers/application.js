"use strict";

/**
 *  application controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::application.application");

/*

This code is defining a Strapi application controller, which is an intermediary between the client and 
the database for the application.

The first line specifies that the code should run in "strict mode", which means that 
it will have stricter syntax rules and error checking.

The following code requires the createCoreController factory from the Strapi framework and assigns it
 to a constant createCoreController. This factory helps to create a Strapi controller for the application.

Finally, the module.exports exports the result of calling createCoreController with the argument 
"api::application.application". The argument specifies the identifier for the controller. 
The returned object is the controller that will handle the client requests.

*/