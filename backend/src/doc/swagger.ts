import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: `${process.env.BASE_URL}:${process.env.PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['../server.js', '../routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

void swaggerAutogen()(outputFile, routes, doc);
