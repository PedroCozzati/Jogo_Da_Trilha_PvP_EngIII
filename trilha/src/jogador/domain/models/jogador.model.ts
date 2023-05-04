import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { JogadorRegistradoEvent } from '../events/impl/jogador-registrado.event';
import { Span } from 'nestjs-otel';
import { JogadorAtualizadaEvent } from '../events/impl/jogador-atualizada.event';
import { JogadorDeletadoEvent } from '../events/impl/jogador-deletado.event';

@Schema({ collection: 'jogador' })
export class Jogador extends BaseModel {

  @Prop({ type: SchemaTypes.String })
  cor: string

  @Prop({ type: SchemaTypes.String })
  nome: string

  @Prop({ type: SchemaTypes.String })
  email: string

  @Prop({ type: SchemaTypes.String })
  senha: string

  @Prop({ type: SchemaTypes.Number })
  saldo: number

  @Prop({ type: SchemaTypes.Date })
  dataNasc: Date

  @Prop({ type: SchemaTypes.Number })
  vitoria: number


  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraJogador() {
    this.apply(new JogadorRegistradoEvent(this.getData()));
  }

  @Span()
  async atualizaJogador() {
    this.apply(new JogadorAtualizadaEvent(this.getData()));
  }

  @Span()
  async deletaJogador() {
    this.apply(new JogadorDeletadoEvent(this.getData()));
  }
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);