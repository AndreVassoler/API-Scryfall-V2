import { Injectable, Module } from '@nestjs/common';



@Injectable()
export class UsersService {
  private users: any[]; // Add a private property 'users' with type 'any[]'

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string) { // Add type annotation for the 'username' parameter
    return this.users.find((user: any) => user.username === username); // Add type annotation for the 'user' parameter
  }
}

@Module({
    providers: [UsersService],
    exports: [UsersService],
  })
  export class UsersModule {}
  