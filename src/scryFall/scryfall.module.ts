import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScryfallService } from './scryfall.service';
import { ScryfallController } from './scryfall.controller';
import { HttpModule } from '@nestjs/axios';
import {  Commander, CommanderSchema } from './commander.schema'; // Importe o schema do Commander
import { Card, CardSchema } from './card.schema'; // Importe o schema do Card

@Module({
  imports: [
    HttpModule,
    // Registrar os modelos Commander e Card no módulo
    MongooseModule.forFeature([
      { name: Commander.name, schema: CommanderSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  providers: [ScryfallService],
  controllers: [ScryfallController],
})
export class ScryfallModule {}
