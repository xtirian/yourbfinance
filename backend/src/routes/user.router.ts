import { type Request, type Response, Router } from 'express';
import { UserRepository } from '../repository/user.respository';
import { type UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';

const router = Router();

const repository = new UserRepository();

// GET /users
router.get('/', (req: Request, res: Response) => {
  const users: Promise<UserModel[]> = repository.findMany({});

  if (users instanceof Error) {
    res.status(400).send({ error: users.message });
    return;
  }

  res.status(200).json({ users });
});

// GET /users/:id
router.get('/:id', (req: Request, res: Response) => {
  const id: string = (req.body as { id: string }).id;
  const user: Promise<UserModel | null> = repository.findUnique({ where: { id } });

  if (user instanceof Error) {
    res.status(400).send({ error: user.message });
    return;
  }

  res.status(200).json({ user });
});

// POST CREATE ACCOUNT /users
router.post('/', (req, res) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };

  if (
    name === '' ||
    name === undefined ||
    email === '' ||
    email === undefined ||
    password === '' ||
    password === undefined
  ) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  const checkUser = async (): Promise<UserModel | null> => await repository.findUnique({ where: { email } });

  if (checkUser() === null) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }

  const bcryptWithGenSaltSync = bcrypt as {
    genSaltSync: (rounds?: number | undefined, minor?: 'a' | 'b' | undefined) => string;
  };

  const bcryptWithHashSync = bcrypt as {
    hashSync: (data: string | Buffer, saltOrRounds: string | number) => string;
  };

  const salt = bcryptWithGenSaltSync.genSaltSync(10);

  const hashedPassword = bcryptWithHashSync.hashSync(password, salt);

  const user = repository.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
  res.status(201).json({ user });
});

export default router;
