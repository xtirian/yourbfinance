import express, { type Express, type Request, type Response } from 'express';
import { logger, dotenv } from './config';
import { swaggerDocs } from './utils/swagger';
import { routes } from './routes';

dotenv.config();
const app: Express = express();
app.use(express.json());

const PORT: number | string = process.env.PORT ?? 4000;

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);

  routes(app);

  swaggerDocs(app, PORT as number);
});
