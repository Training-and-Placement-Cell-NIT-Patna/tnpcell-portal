'use strict';

/**
 *  coordinator controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coordinator.coordinator',({ strapi }) => ({
    async findByYear(ctx) {
        const { year } = ctx.params;
        try {
          const coordinators = await strapi.query('api::coordinator.coordinator').findMany({ 
            where: {
                year: year,
            },
            populate:true
            })
          return ctx.send(coordinators);
        } catch (err) {
          return ctx.send({ error: 'An error occurred while fetching data.' }, 500);
        }
    }
}));