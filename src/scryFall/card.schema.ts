import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  manaCost: string;

  @Prop()
  imageUrl: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
