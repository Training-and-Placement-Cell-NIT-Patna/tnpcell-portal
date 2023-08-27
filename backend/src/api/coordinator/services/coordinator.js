'use strict';

/**
 * coordinator service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::coordinator.coordinator');
