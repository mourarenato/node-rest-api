import { Request, Response } from 'express';
import { User } from '../entity/User';
import { IUser } from '../entity/User';
import { getConnection, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { logError, logApi } from '../logger';
import hash from 'crypto';
import jwtDecode from 'jwt-decode';

const errorUser = 'Email or password is wrong!';
const errorLogin = 'You must send user email and password!';

export const signup = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);

    const resultValidateCredentials = await validateLoginAndPassword(
      req.body.email,
      req.body.password
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const resultSearchUser = await findUserByEmail(req.body.email);

    if (resultSearchUser === null) {
      const errorUser = 'Email already exists! ';
      logApi(errorUser);
      return res.status(400).json(errorUser);
    }

    const user: IUser = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    getConnection().manager.find(User);
    const savedUser = await userRepository.save(user);

    res.status(200).json(savedUser);
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};

async function findUserByEmail(email: string) {
  const userRepository = getRepository(User);

  const userLogin = await userRepository
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where(`user.email = '${email}'`)
    .getMany();

  if (userLogin?.length > 0) {
    return null;
  }

  return userLogin;
}

async function validateLoginAndPassword(login: string, password: string) {
  if (!login || !password) {
    logApi(errorLogin);
    return false;
  }
  return true;
}

export const signin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const resultValidateCredentials = await validateLoginAndPassword(
      email,
      password
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const userRepository = getRepository(User);
    const cryptPassword = JSON.stringify(
      hash.createHmac('sha256', password).digest('hex')
    );

    const user = await findUser(userRepository, email, cryptPassword);

    if (!user) {
      logApi(errorUser);
      return res.status(400).json(errorUser);
    }

    logApi('Login sucessfull! ');

    const token: string = jwt.sign(
      { id: user },
      process.env.TOKEN_SECRET || 'tokentest',
      {
        expiresIn: 60 * 60 * 24
      }
    );

    //return res.header('auth-token', token).status(200).json(user); //alternative in header
    return res.status(200).json(token);
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};

async function findUser(
  userRepository: any,
  email: string,
  cryptPassword: string
) {
  const user = await userRepository
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where(`user.password ::jsonb @> '${cryptPassword}'`)
    .andWhere(`user.email = '${email}'`)
    .getMany();

  if (user.length == 0 || user == null) {
    return false;
  }
  return user;
}

export const profile = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const resultValidateCredentials = await validateLoginAndPassword(
      email,
      password
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const userRepository = getRepository(User);
    const cryptPassword = JSON.stringify(
      hash.createHmac('sha256', password).digest('hex')
    );

    const user = await findUser(userRepository, email, cryptPassword);

    if (!user) {
      return res.status(404).json('No User found!');
    }
    return res.json(user);
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const resultValidateCredentials = await validateLoginAndPassword(
      email,
      password
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const userRepository = getRepository(User);
    const cryptPassword = JSON.stringify(
      hash.createHmac('sha256', password).digest('hex')
    );

    const user = await findUser(userRepository, email, cryptPassword);

    if (!user) {
      return res.status(404).json('No User found!');
    }

    const tokenDecoded: JSON = jwtDecode(req.query.API_KEY);

    if (tokenDecoded.id[0].id !== user[0].id) {
      return res.status(401).json(`You can just only delete your own user`);
    }

    await userRepository.delete(user);
    return res.status(200).json('User deleted with success!');
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};
