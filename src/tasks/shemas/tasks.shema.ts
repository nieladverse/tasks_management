import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop({ required: true , unique: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    is_complete: boolean = false;

    @Prop({ required: true })
    due_date: Date;

    @Prop({ required: true,
        enum: ['low', 'medium', 'high'],
     })
    priority: string;

    @Prop({ required: true })
    list_id: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}


export const TaskShema = SchemaFactory.createForClass(Task);