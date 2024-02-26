import { type Express, type Request, type Response } from 'express';

import userRouter from './routes/user.router';

export const routes = (app: Express): void => {
  app.use('/user', userRouter);

  app.get('/transaction', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User Route' });
  });
  app.get('/goal', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User Route' });
  });
  app.get('/category', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User Route' });
  });
};
