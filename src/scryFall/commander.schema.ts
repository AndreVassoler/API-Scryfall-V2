import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

@Schema()
export class Commander extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  manaCost: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Card' }] })
  deck: Card[];

  @Prop({ required: true })
  userId: string;
}

export const CommanderSchema = SchemaFactory.createForClass(Commander);
