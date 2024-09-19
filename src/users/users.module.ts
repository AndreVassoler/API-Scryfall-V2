import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],  // Isso garante que outros módulos possam usar UsersService
})
export class UsersModule {}
