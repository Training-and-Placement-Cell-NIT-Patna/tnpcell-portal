'use strict';

/**
 * program service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::program.program');
