import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commander, Card } from './commander.schema';

@Injectable()
export class ScryfallService {
  private decks = [];

  constructor(
    @InjectModel(Commander.name) private commanderModel: Model<Commander>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}


  createDeck(userId: number, deck: any): any {
    const newDeck = { ...deck, userId, id: this.decks.length + 1 };
    this.decks.push(newDeck);
    return newDeck;
  }


  findAllDecks(): any[] {
    return this.decks;
  }


  findDecksByUser(userId: number): any[] {
    return this.decks.filter(deck => deck.userId === userId);
  }


  validateCommanderRules(deck: any): boolean {

    if (deck.cards.length < 60) {
      return false;
    }
    return true;
  }


  saveDeck(deck: any): any {
    const newDeck = { ...deck, id: this.decks.length + 1 };
    this.decks.push(newDeck);
    return newDeck;
  }
}