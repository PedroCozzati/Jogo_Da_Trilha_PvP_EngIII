import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { TransacaoRegistradaEvent } from '../events/impl/transacao-registrada.event';
import { Span } from 'nestjs-otel';

@Schema({ collection: 'transacao' })
export class Transacao extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  jogador: String

  @Prop({ type: SchemaTypes.Number })
  valor: number

  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraTransacao() {
    this.apply(new TransacaoRegistradaEvent(this.getData()));
  }
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);