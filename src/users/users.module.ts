import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Importar o controlador

@Module({
  providers: [UsersService],
  controllers: [UsersController], // Adicionar o controlador ao módulo
  exports: [UsersService],  
})
export class UsersModule {}
