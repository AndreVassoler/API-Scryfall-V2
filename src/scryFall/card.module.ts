import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Commander, CommanderSchema } from './commander.schema';
import { ScryfallService } from './scryfall.service';
import { ScryfallController } from './scryfall.controller';

@Module ({
    imports: [MongooseModule.forFeature([{ name: Commander.name, schema: CommanderSchema }])],
    providers: [ScryfallService],
    controllers: [ScryfallController],
})

export class ScryfallModule {}