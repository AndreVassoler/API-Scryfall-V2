import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Rota para criar um novo usuário
  @Post('create')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const user = await this.usersService.create(username, password);
    return {
      message: 'User created successfully',
      user,
    };
  }

  // Rota para listar todos os usuários (apenas para fins de teste)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }
}
