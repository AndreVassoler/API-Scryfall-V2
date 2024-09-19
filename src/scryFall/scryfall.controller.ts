import { Controller, Get, Query } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';
import { Observable } from 'rxjs';

@Controller('scryfall')
export class ScryfallController {
    constructor(private readonly scryfallService: ScryfallService) {}

    @Get('card/:name') // Rota para buscar uma carta pelo nome
    getCardByName(@Query('name') name: string): Observable<any> {
        return this.scryfallService.findCardByName(name);
    }

    @Get('commanders') // Rota para buscar todos os comandantes
    getAllCommanders(): Observable<any> {
        return this.scryfallService.findAllCommanders();
    }

    @Get('commander-deck')  // Rota para buscar o comandante e o deck
    getCommanderAndDeck(@Query('name') name: string): Observable<any> {
        return this.scryfallService.findCommanderAndDeck(name);
    }
}