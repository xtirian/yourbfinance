import { type Express, type Request, type Response } from 'express';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { version, name } from '../../package.json';
import { logger } from '../config/index';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name,
      version,
      description: 'A simple Express API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        security: [
          {
            bearerAuth: []
          }
        ],
        servers: [
          {
            url: `${process.env.BASE_URL}:${process.env.PORT}`
          }
        ]
      }
    }
  },
  apis: ['../src/routes.ts', '../src/models/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number): void => {
  // Swagger page
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Swagger JSON
  app.get('swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at ${process.env.BASE_URL}:${port}/api-docs`);
};
