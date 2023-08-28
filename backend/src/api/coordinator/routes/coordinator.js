'use strict';

/**
 * coordinator router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::coordinator.coordinator');