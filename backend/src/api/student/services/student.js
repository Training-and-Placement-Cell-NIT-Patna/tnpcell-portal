'use strict';

/**
 * student service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::student.student');
