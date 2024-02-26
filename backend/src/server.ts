import express, { type Express, type Request, type Response } from 'express';
import { logger, dotenv } from './config';
import { routes } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './doc/swagger-output.json';

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL ?? 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Passa para o próximo middleware
  next();
});

const PORT: number | string = process.env.PORT ?? 4000;

const swaggerOptions = { customCss: 'swagger-ui.css' };

// TODO: Add a condition to serve the swagger documentation in production environments with Morgan logging.
if (process.env.NODE_ENV === 'production') {
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/api-docs');
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerOptions));
}

if (process.env.NODE_ENV === 'develop') {
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/api-docs');
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerOptions));
}

routes(app);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
