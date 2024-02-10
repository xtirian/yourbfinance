import express, { type Express, type Request, type Response } from 'express';
import { logger, dotenv } from './config';

dotenv.config();
const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World' });
});

app.listen(4000, () => {
  logger.info('Server is running on port 4000');
});
