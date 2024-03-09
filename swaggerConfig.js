const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'API documentation for displaying Users API using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3002', // Change this URL according to your server setup
      },
    ],
  },
  apis: ['./routes/User.routes.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;