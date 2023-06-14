
import { AggregateRoot } from '@nestjs/cqrs';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class BaseModel extends AggregateRoot {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop({ type: SchemaTypes.Date })
    _created_at: Date = new Date();

    constructor() {
        super();
    }

    getData() {
        return Object.assign(this);
    }

    static create<TDocument extends BaseModel>(c: { new(): TDocument }): TDocument {
        return new c();
    }
}
