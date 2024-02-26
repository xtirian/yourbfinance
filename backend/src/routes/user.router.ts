import { type Request, type Response, Router } from 'express';
import { UserRepository } from '../repository/user.respository';
import { type UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
import { jwtConfig } from '../utils/JTWConfig';

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
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', async (req: Request, res: Response) => {
  const id: string = (req.body as { id: string }).id;
  const user = await repository.findUnique({ where: { id } });

  if (user === null) {
    res.status(400).send({ error: 'Usuário não encontrado' });
    return;
  }
  const token = jwtConfig(user);
  res.status(200).json({ token });
});

// POST CREATE ACCOUNT /users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/signup', async (req, res): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, last_name, email, password } = req.body as {
    name: string;
    last_name: string;
    email: string;
    password: string;
  };

  if (
    name === '' ||
    name === undefined ||
    last_name === '' ||
    last_name === undefined ||
    email === '' ||
    email === undefined ||
    password === '' ||
    password === undefined
  ) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  const checkUser = await repository.findFirst({ where: { email } });

  if (checkUser !== null) {
    res.status(400).json({ message: 'Usuário já existe' });
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

  const user = await repository.create({
    data: {
      name,
      last_name,
      email,
      password: hashedPassword
    }
  });
  res.status(201).json({ user });
});

// POST LOGIN ACCOUNT /users
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await repository.findFirst({ where: { email } });

    if (user === null) {
      res.status(400).json({ message: 'Usuário ou senha inválido' });
      return;
    }

    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) {
      res.status(400).json({ message: 'Usuário ou senha inválido' });
      return;
    }

    const token = jwtConfig(user);

    if (token === undefined) res.status(500).json({ message: 'Erro ao gerar token' });

    res.status(200).json({ token, avatar: user.avatar });
  } catch {
    res.status(500).json({ message: 'Erro interno' });
  }
});

export default router;
