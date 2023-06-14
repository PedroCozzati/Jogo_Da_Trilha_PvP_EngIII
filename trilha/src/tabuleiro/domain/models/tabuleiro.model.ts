import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { TabuleiroRegistradoEvent } from '../events/impl/tabuleiro-registrado.event';
import { Span } from 'nestjs-otel';
import { TabuleiroAtualizadaEvent } from '../events/impl/tabuleiro-atualizada.event';
import { TabuleiroDeletadoEvent } from '../events/impl/tabuleiro-deletado.event';

@Schema({ collection: 'tabuleiro' })
export class Tabuleiro extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  cor: string

  @Prop({ type: SchemaTypes.String })
  nome: string

  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraTabuleiro() {
    this.apply(new TabuleiroRegistradoEvent(this.getData()));
  }

  @Span()
  async atualizaTabuleiro() {
    this.apply(new TabuleiroAtualizadaEvent(this.getData()));
  }

  @Span()
  async deletaTabuleiro() {
    this.apply(new TabuleiroDeletadoEvent(this.getData()));
  }
}

export const TabuleiroSchema = SchemaFactory.createForClass(Tabuleiro);