import { Module } from '@nestjs/common';
import { ScryfallController } from './scryFall/scryfall.controller';
import { ScryfallService } from './scryFall/scryfall.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommanderSchema, CardSchema } from './scryFall/commander.schema';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager'; 

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/scryfall-cards'), // Conexão local
    MongooseModule.forFeature([{ name: 'Commander', schema: CommanderSchema }, { name: 'Card', schema: CardSchema }]),
    CacheModule.register(),
    AuthModule,
  ],
  controllers: [ScryfallController],
  providers: [ScryfallService],
})
export class AppModule {}