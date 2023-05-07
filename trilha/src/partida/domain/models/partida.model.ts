import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { PartidaRegistradaEvent } from '../events/impl/partida-registrada.event';
import { Span } from 'nestjs-otel';
import { PartidaAtualizadaEvent } from '../events/impl/partida-atualizada.event';
import { PartidaDeletadaEvent } from '../events/impl/partida-deletada.event';

@Schema({ collection: 'partida' })
export class Partida extends BaseModel {

  @Prop({ type: SchemaTypes.ObjectId })
  jogador1_id: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId })
  jogador2_id: Types.ObjectId

  @Prop({ type: SchemaTypes.String })
  nivel_id: Types.ObjectId

  @Prop({ type: SchemaTypes.Array })
  versaoPartida: Array<any> = []

  @Prop({ type: SchemaTypes.String })
  resultado: string


  constructor(object: any) {
    super();

    Object.assign(this, object);
  }

  @Span()
  async registraPosicoesIniciais() {
    this.versaoPartida.push([
      [
        [-4, 4],
        [-4, 3],
        [-4, 2],
        [-4, 1],
        [-4, 0],
        [-4, -1],
        [-4, -2],
        [-4, -3],
        [-4, -4],
      ],
      [
        [4, 4],
        [4, 3],
        [4, 2],
        [4, 1],
        [4, 0],
        [4, -1],
        [4, -2],
        [4, -3],
        [4, -4],
      ]
    ])
  }

  @Span()
  async registraPartida() {
    this.apply(new PartidaRegistradaEvent(this.getData()));
  }

  @Span()
  async atualizaPartida() {
    this.apply(new PartidaAtualizadaEvent(this.getData()));
  }

  @Span()
  async deletaPartida() {
    this.apply(new PartidaDeletadaEvent(this.getData()));
  }

}

export const PartidaSchema = SchemaFactory.createForClass(Partida);