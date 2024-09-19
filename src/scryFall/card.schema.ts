import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Commander extends Document {
    @Prop({ required: true})
    name: string;

    @Prop()
    type: string;

    @Prop()
    manaCost: string;

    @Prop()
    imageUrl: string;
}

export const CommanderSchema = SchemaFactory.createForClass(Commander);