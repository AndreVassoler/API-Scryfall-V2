import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commander, Card } from './commander.schema';
import { AxiosResponse } from 'axios';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ScryfallService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Commander.name) private commanderModel: Model<Commander>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}

  findCardByName(name: string): Observable<any> {
    const url = `https://api.scryfall.com/cards/named?fuzzy=${name}`;
    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  findAllcommanders(): Observable<any> {
    const url = 'https://api.scryfall.com/cards/search?q=is%3Acommander';
    return this.httpService.get(url).pipe(
      map((response: AxiosResponse) => response.data)
    );
  }

  findCommanderAndDeck(name: string): Observable<any> {
    return this.findCardByName(name).pipe(
      switchMap((commanderData) => {
        const url = `https://api.scryfall.com/cards/search?q=type:${commanderData.type_line}+not:${commanderData.name}`;
        return this.httpService.get(url).pipe(
          switchMap((response: AxiosResponse) => {
            const deckData = response.data.data.slice(0, 99);

            // Criar os documentos de cartas (Card)
            const deckCards = deckData.map(card => new this.cardModel({
              name: card.name,
              type: card.type_line,
              manaCost: card.mana_cost,
              imageUrl: card.image_uris?.normal,
            }));

            // Criar o documento de comandante (Commander)
            const commander = new this.commanderModel({
              name: commanderData.name,
              type: commanderData.type_line,
              manaCost: commanderData.mana_cost,
              imageUrl: commanderData.image_uris?.normal,
              deck: deckCards,
            });

            // Salvar o comandante e o deck no banco de dados
            return forkJoin([
              this.cardModel.insertMany(deckCards),
              commander.save(),
            ]).pipe(
              map(() => ({
                commander,
                deck: deckCards,
              }))
            );
          })
        );
      })
    );
  }
}
