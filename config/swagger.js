const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jira Clone API',
      version: '1.0.0',
      description: 'API documentation for the Jira Clone project',
      contact: {
        name: 'Amrendra',
        email: 'singhnamrendra@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/chat.js'], // Path to all route files
  // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
