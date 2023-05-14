import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { PartidaRegistradaEvent } from '../events/impl/partida-registrada.event';
import { Span } from 'nestjs-otel';
import { JogadaEfetuadaEvent } from '../events/impl/jogada-efetuada.event';
import { PartidaDeletadaEvent } from '../events/impl/partida-deletada.event';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';
import { PartidaModule } from 'src/partida/partida.module';

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
    // [cor da posicao, x axis, y axis]

    this.versaoPartida.push([
      [
        [1, -4, 4],
        [1, -4, 3],
        [1, -4, 2],
        [1, -4, 1],
        [1, -4, 0],
        [1, -4, -1],
        [1, -4, -2],
        [1, -4, -3],
        [1, -4, -4],
      ],
      [
        [2, 4, 4],
        [2, 4, 3],
        [2, 4, 2],
        [2, 4, 1],
        [2, 4, 0],
        [2, 4, -1],
        [2, 4, -2],
        [2, 4, -3],
        [2, 4, -4],
      ]
    ])
  }

  // @Span()
  // async checaPosicaoLivre(pardidaDto: PartidaDto) {

  // throw new ForaDoPlano();
  // }

  @Span()
  async registraNovaJogada(registraJogada: PartidaDto) {
    // lógica das jogadas
    // erro = throw Exception
    const novaVersaoPartida = []
    const posicaoAntiga = registraJogada.versaoPartida[0];
    const posicaoNova = registraJogada.versaoPartida[1];

    const ultimaVersaoPartida = this.versaoPartida[this.versaoPartida.length - 1]
    for (let i = 0; i < ultimaVersaoPartida.length; i++) {
      const element = ultimaVersaoPartida[i];
      const subArray = [];


      for (let j = 0; j < element.length; j++) {
        if (posicaoAntiga[1] === element[j][1] && posicaoAntiga[2] === element[j][2]) {
          subArray.push(posicaoNova)
        }
        else {
          subArray.push(element[j])
        }
      }
      novaVersaoPartida.push(subArray);
    }

    this.versaoPartida.push(novaVersaoPartida)
  }

  @Span()
  async registraPartida() {
    this.apply(new PartidaRegistradaEvent(this.getData()));
  }

  @Span()
  async efetuaJogada() {
    this.apply(new JogadaEfetuadaEvent(this.getData()));
  }

  @Span()
  async deletaPartida() {
    this.apply(new PartidaDeletadaEvent(this.getData()));
  }

}

export const PartidaSchema = SchemaFactory.createForClass(Partida);