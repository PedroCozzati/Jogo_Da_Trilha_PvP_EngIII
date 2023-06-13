import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { JogadorRegistradoEvent } from '../events/impl/jogador-registrado.event';
import { Span } from 'nestjs-otel';
import { JogadorAtualizadoEvent } from '../events/impl/jogador-atualizado.event';
import { JogadorDeletadoEvent } from '../events/impl/jogador-deletado.event';
import { SaldoJogadorAtualizadoEvent } from '../events/impl/saldo-jogador-atualizado.event';

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

  @Prop({ type: SchemaTypes.Number, default: 0 })
  saldo: number

  @Prop({ type: SchemaTypes.Number })
  vitorias: number = 0


  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async modificaSaldo(saldo: number) {
    this.saldo += saldo
  }

  @Span()
  async modificaVitoria() {
    this.vitorias += 1
  }

  @Span()
  async registraJogador() {
    this.apply(new JogadorRegistradoEvent(this.getData()));
  }

  @Span()
  async atualizaJogador() {
    this.apply(new JogadorAtualizadoEvent(this.getData()));
  }

  @Span()
  async atualizaSaldoJogador() {
    this.apply(new SaldoJogadorAtualizadoEvent(this.getData()));
  }

  @Span()
  async atualizaVitoriaJogador() {
    this.apply(new SaldoJogadorAtualizadoEvent(this.getData()));
  }

  @Span()
  async deletaJogador() {
    this.apply(new JogadorDeletadoEvent(this.getData()));
  }
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);