const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};