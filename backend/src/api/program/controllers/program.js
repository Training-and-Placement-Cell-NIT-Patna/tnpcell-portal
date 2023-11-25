'use strict';

/**
 *  program controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::program.program');
