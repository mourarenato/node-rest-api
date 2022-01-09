import { Request, Response } from 'express';
import { User } from '../entity/User';
import { IUser } from '../entity/User';
import { getConnection, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { logError, logApi } from '../logger';
import hash from 'crypto';

export const signup = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);

    const resultValidateCredentials = await validateLoginAndPassword(
      req.body.email,
      req.body.password
    );

    if (resultValidateCredentials == false) {
      return res.status(400).json('Should inform login and password!');
    }

    const resultSearchUser = await searchUser(req.body.email);

    if (resultSearchUser == null) {
      const errorUser = 'Email is already! ';
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

async function searchUser(email: string) {
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
    const errorPassword = 'Should inform login and password!';
    logApi(errorPassword);
    return false;
  }
  return true;
}

export const signin = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const cryptPassword = JSON.stringify(
      hash.createHmac('sha256', req.body.password).digest('hex')
    );
    const email = req.body.email;

    const user = await userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`user.password ::jsonb @> '${cryptPassword}'`)
      .andWhere(`user.email = '${email}'`)
      .getMany();

    if (user.length == 0 || user == null) {
      const errorUser = 'Email or password is wrong!';
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

    return res.header('auth-token', token).status(200).json(user);
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.userId);

    if (!user) return res.status(404).json('No User found!');
    res.json(user);
  } catch (e) {
    logError(`${e}`);
    return res.status(500).json(`${e}`);
  }
};
