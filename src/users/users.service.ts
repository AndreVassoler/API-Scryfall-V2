import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/create-user.dto';

@Injectable()
export class UsersService {
  login(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  private users = [];

  async findOne(username: string): Promise<any> {
    return this.users.find(user => user.username === username);
  }

  async create(user: any): Promise<any> {

    const existingUser = await this.findOne(user.username);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }


    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      userId: this.users.length + 1,
      username: user.username,
      password: hashedPassword, 
    };
    this.users.push(newUser);
    return newUser;
  }
}