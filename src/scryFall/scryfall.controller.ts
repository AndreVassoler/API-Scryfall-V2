
import {
    Controller, Get, Post, Body, Query, UseGuards, Request,
    UseInterceptors, BadRequestException
  } from '@nestjs/common';
  import { ScryfallService } from './scryfall.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CacheInterceptor } from '@nestjs/cache-manager';

  
  @Controller('decks')
  export class ScryfallController {
    constructor(private readonly scryfallService: ScryfallService) {}
  

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createDeck(@Request() req, @Body() deck: any) {
      return this.scryfallService.createDeck(req.user.id, deck);
    }
  
  

    @UseGuards(JwtAuthGuard)
    @Get()
    findUserDecks(@Request() req) {
      return this.scryfallService.findDecksByUser(req.user.id);
    }
  

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CacheInterceptor)
    @Get('cached')
    findUserDecksCached(@Request() req) {
      return this.scryfallService.findDecksByUser(req.user.id);
    }
  

    @UseGuards(JwtAuthGuard)
    @Post('import')
    importDeck(@Body() deck: any) {
      const isValid = this.scryfallService.validateCommanderRules(deck);
      if (!isValid) {
        throw new BadRequestException('O baralho não segue as regras do Commander.');
      }
      return this.scryfallService.saveDeck(deck);
    }
  }
  
