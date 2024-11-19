import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class List extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  user_id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ListShema = SchemaFactory.createForClass(List);
