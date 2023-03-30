import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { PecaRegistradaEvent } from '../events/impl/peca-registrada.event';
import { Span } from 'nestjs-otel';
import { PecaAtualizadaEvent } from '../events/impl/peca-atualizada.event';

@Schema({ collection: 'peca' })
export class Peca extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  jogador: String

  @Prop({ type: SchemaTypes.Number })
  valor: number

  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraPeca() {
    this.apply(new PecaRegistradaEvent(this.getData()));
  }

  @Span()
  async atualizaPeca() {
    this.apply(new PecaAtualizadaEvent(this.getData()));
  }
}

export const PecaSchema = SchemaFactory.createForClass(Peca);