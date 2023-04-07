import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { PecaRegistradaEvent } from '../events/impl/peca-registrada.event';
import { Span } from 'nestjs-otel';
import { PecaAtualizadaEvent } from '../events/impl/peca-atualizada.event';
import { PecaDeletadaEvent } from '../events/impl/peca-deletada.event';

@Schema({ collection: 'peca' })
export class Peca extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  nome: string

  @Prop({ type: SchemaTypes.String })
  corLadoA: string

  @Prop({ type: SchemaTypes.String })
  corLadoB: string


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

  @Span()
  async deletaPeca() {
    this.apply(new PecaDeletadaEvent(this.getData()));
  }

}

export const PecaSchema = SchemaFactory.createForClass(Peca);