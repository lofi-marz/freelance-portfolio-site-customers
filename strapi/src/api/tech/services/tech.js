'use strict';

/**
 * tech service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tech.tech');
