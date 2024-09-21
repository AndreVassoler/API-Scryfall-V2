import { Module } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';
import { ScryfallController } from './scryfall.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ScryfallService],
  controllers: [ScryfallController],
})

export class ScryfallModule {}
