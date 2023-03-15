import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { JogadorRegistradoEvent } from '../events/impl/jogador-registrado.event';
import { Span } from 'nestjs-otel';

@Schema({ collection: 'jogador' })
export class Jogador extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  nome: string

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