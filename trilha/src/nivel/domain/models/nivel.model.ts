import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { NivelRegistradoEvent } from '../events/impl/nivel-registrado.event';
import { Span } from 'nestjs-otel';
import { NivelAtualizadaEvent } from '../events/impl/nivel-atualizada.event';
import { NivelDeletadoEvent } from '../events/impl/nivel-deletado.event';

@Schema({ collection: 'nivel' })
export class Nivel extends BaseModel {

  @Prop({ type: SchemaTypes.ObjectId })
  tabuleiro_id: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId })
  peca_id: Types.ObjectId

  @Prop({ type: SchemaTypes.String })
  nome: string

  @Prop({ type: SchemaTypes.Number })
  valorDeAposta: number

  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraNivel() {
    this.apply(new NivelRegistradoEvent(this.getData()));
  }

  @Span()
  async atualizaNivel() {
    this.apply(new NivelAtualizadaEvent(this.getData()));
  }

  @Span()
  async deletaNivel() {
    this.apply(new NivelDeletadoEvent(this.getData()));
  }
}

export const NivelSchema = SchemaFactory.createForClass(Nivel);