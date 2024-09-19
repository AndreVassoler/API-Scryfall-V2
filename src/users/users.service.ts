import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: any[] = []; // Inicia com um array vazio para armazenar os usuários.

  constructor() {}

  // Método para encontrar um usuário pelo nome de usuário
  async findOne(username: string) {
    return this.users.find((user: any) => user.username === username);
  }

  // Método para criar um novo usuário com senha criptografada
  async create(username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = { userId: this.users.length + 1, username, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  // Método para retornar todos os usuários (apenas para fins de teste)
  async findAll() {
    return this.users;
  }
}
