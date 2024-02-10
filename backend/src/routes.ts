import { type Express, type Request, type Response } from 'express';

export const routes = (app: Express): void => {
  /**
   * @openapi
   * /user:
   * get:
   *   tag:
   *   - User
   *   description: Get User
   *   responses:
   *    200:
   *     description: App is up and running
   */
  app.get('/user', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User Route' });
  });
};
