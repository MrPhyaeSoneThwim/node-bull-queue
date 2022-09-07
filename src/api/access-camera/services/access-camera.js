'use strict';

/**
 * access-camera service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-camera.access-camera');
