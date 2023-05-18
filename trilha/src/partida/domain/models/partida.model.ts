import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Span } from 'nestjs-otel';
import { Logger } from 'nestjs-pino';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';
import { JogadaEfetuadaEvent } from '../events/impl/jogada-efetuada.event';
import { PartidaDeletadaEvent } from '../events/impl/partida-deletada.event';
import { PartidaRegistradaEvent } from '../events/impl/partida-registrada.event';

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

  // @Span()
  // async checaPosicaoLivre(pardidaDto: PartidaDto) {

  // throw new ForaDoPlano();
  // }
  @Span()
  verificaMoinho(mapaLadoAutor: any[]): any[] {
    const agrupamentoPorEixoX: any = Object.entries(this.groupBy(mapaLadoAutor, '0'))
    const agrupamentoPorEixoY: any = Object.entries(this.groupBy(mapaLadoAutor, '1'))
    //tem que verificar se o moinho está disponível
    return [
      ...agrupamentoPorEixoX.filter(grupo => grupo.at(1).length === 3 && parseInt(grupo.at(0)) < 4 && parseInt(grupo.at(0)) > -4),
      ...agrupamentoPorEixoY.filter(grupo => grupo.at(1).length === 3 && parseInt(grupo.at(0)) < 4 && parseInt(grupo.at(0)) > -4)
    ]
  }

  @Span()
  registraNovaJogada(registraJogada: PartidaDto, logger: Logger) {
    this.versaoPartida.push(registraJogada.versaoPartida)

    const versaoPartidaClone = JSON.parse(JSON.stringify(this.versaoPartida));
    const mapaTabuleiro = versaoPartidaClone.shift();

    const moinhoEncontrado = [];

    versaoPartidaClone.forEach((versao, index, array) => {

      const mapaLadoAutor = mapaTabuleiro.at(this.obtemIndiceAutorJogada(versao))

      for (let i = 0; i < mapaLadoAutor.length; i++) {
        if (mapaLadoAutor[i].toString() === versao.at(0).toString())
          mapaLadoAutor[i] = versao.at(1)
      }

      if (index === array.length - 1)
        moinhoEncontrado.push(...this.verificaMoinho(mapaLadoAutor))
    });

    if (moinhoEncontrado.length > 0)
      logger.log("Moinho encontrado", { moinho_data: moinhoEncontrado });
  }

  @Span()
  private obtemIndiceAutorJogada(versao: any[]) {
    return this.jogador1_id.toString() === versao.at(2) ? 0 : 1
  }

  @Span()
  private groupBy(xs, key) {
    return xs.filter(x => x.at(0) > -4 && x.at(0) < 4 && x.at(1) > -4 && x.at(1) < 4).reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
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