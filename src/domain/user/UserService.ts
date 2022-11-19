import { UserRepository } from '../../repository/pgSQL/Repositories-pgSQL';
import { Users } from './UsersEntity';
import * as AccountService from '../account/AccountService';
import bcrypt = require('bcrypt');
import { balanceUserSchema } from './UsersSchema';

export async function findByUsername(username: string): Promise<Users> {
  return await UserRepository.findOneBy({
    username,
  });
}

export async function createUser(
  username: string,
  password: string
): Promise<Users> {
  try {
    if (await this.findByUsername(username)) {
      throw new Error('Usuario já cadastrado!');
    } else {
      const newAccount = await AccountService.createAccount();
      const newUser = new Users(username, password, newAccount);
      newUser.password = bcrypt.hashSync(password, 10); //pass + saltRounds
      return await UserRepository.save(newUser);
    }
  } catch (error) {
    throw error;
  }
}

export async function loginUser(
  username: string,
  password: string
): Promise<Users> {
  try {
    const loginUser = await UserRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!loginUser) {
      throw new Error('Username incorreto!');
    }

    const isMatch = bcrypt.compareSync(password, loginUser.password);
    if (isMatch) {
      return loginUser;
    } else {
      throw new Error('Senha errada!');
    }
  } catch (error) {
    throw error;
  }
}

export async function userBalance(username: string): Promise<number> {
  try {
    const balanceValue = await UserRepository.findOne({
      relations: {
        account: true,
      },
      where: [{ username }],
    });
    return balanceValue.account.balance;
  } catch (error) {
    throw new Error('Usuário não localizado!');
  }
}
