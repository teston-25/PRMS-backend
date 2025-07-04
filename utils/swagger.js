const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Patient Record Management API',
      version: '1.0.0',
      description: 'API documentation for the PRMS backend system',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', 'swaggerDocs.js '],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
