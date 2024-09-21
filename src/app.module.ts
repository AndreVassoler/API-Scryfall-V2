import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScryfallModule } from './scryfall/scryfall.module'; // Certifique-se que o caminho esteja correto

@Module({
  imports: [
    // ConfigModule para carregar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Torna as configurações disponíveis globalmente
    }),

    // Configuração de conexão com MongoDB usando variáveis de ambiente
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/scryfall-cards', // URI do MongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    // Módulos de funcionalidade
    AuthModule,
    UsersModule,
    ScryfallModule,
  ],
  controllers: [], // Adicione controladores globais aqui, se necessário
  providers: [], // Adicione provedores globais aqui, se necessário
})
export class AppModule {}
