import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { JogadorRegistradoEvent } from '../events/impl/jogador-registrado.event';
import { Span } from 'nestjs-otel';

@Schema({ collection: 'jogador' })
export class Jogador extends BaseModel {

  @Prop({ type: SchemaTypes.Boolean })
  isOld: boolean

  @Prop({ type: SchemaTypes.Boolean })
  isInaccurate: boolean

  @Prop({ type: SchemaTypes.Number })
  altitude: number

  @Prop({ type: SchemaTypes.String })
  positionType: string

  @Prop({ type: SchemaTypes.Mixed })
  secureLocation: any

  @Prop({ type: SchemaTypes.Number })
  secureLocationTs: number

  @Prop({ type: SchemaTypes.Number })
  latitude: number

  @Prop({ type: SchemaTypes.Number })
  floorLevel: number

  @Prop({ type: SchemaTypes.Number })
  horizontalAccuracy: number

  @Prop({ type: SchemaTypes.String })
  locationType: string

  @Prop({ type: SchemaTypes.Date })
  timeStamp: Date

  @Prop({ type: SchemaTypes.Boolean })
  locationFinished: boolean

  @Prop({ type: SchemaTypes.Number })
  verticalAccuracy: number

  @Prop({ type: SchemaTypes.Mixed })
  locationMode: any

  @Prop({ type: SchemaTypes.Number })
  longitude: number

  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraJogador() {
    this.apply(new JogadorRegistradoEvent(this.getData()));
  }
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);