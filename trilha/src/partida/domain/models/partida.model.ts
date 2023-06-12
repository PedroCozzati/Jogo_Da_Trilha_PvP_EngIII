import { BaseModel } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Span } from 'nestjs-otel';
import { Logger } from 'nestjs-pino';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';
import { JogadaEfetuadaEvent } from '../events/impl/jogada-efetuada.event';
import { PartidaDeletadaEvent } from '../events/impl/partida-deletada.event';
import { PartidaRegistradaEvent } from '../events/impl/partida-registrada.event';
import { MoinhoEfetuadoEvent } from '../events/impl/moinho-efetuado.event';
import { PartidaFinalizadaEvent } from '../events/impl/partida-finalizada.event';

@Schema({ collection: 'partida' })
export class Partida extends BaseModel {

  @Prop({ type: SchemaTypes.ObjectId })
  jogador1_id: string

  @Prop({ type: SchemaTypes.ObjectId })
  jogador2_id: string

  @Prop({ type: SchemaTypes.ObjectId })
  nivel_id: string

  @Prop({ type: SchemaTypes.Array })
  versaoPartida: Array<any> = []

  @Prop({ type: SchemaTypes.Array })
  moinhosAtivos: Array<any> = []

  @Prop({ type: SchemaTypes.String })
  resultado: string

  @Prop({ type: SchemaTypes.String })
  aguardandoResolucaoMoinho: string

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

  @Span()
  verificaMoinho(mapaLadoAutor: any[]): any[] {
    const agrupamentoPorEixoX: any = Object.entries(this.groupBy(mapaLadoAutor.filter(item => item), '0'))
    const agrupamentoPorEixoY: any = Object.entries(this.groupBy(mapaLadoAutor.filter(item => item), '1'))

    return [
      ...agrupamentoPorEixoX.filter(grupo => grupo.at(1).length === 3 && parseInt(grupo.at(0)) < 4 && parseInt(grupo.at(0)) > -4 && !this.moinhosAtivos.some(moinhoAtivo => moinhoAtivo.toString() === grupo.at(1).toString())),
      ...agrupamentoPorEixoY.filter(grupo => grupo.at(1).length === 3 && parseInt(grupo.at(0)) < 4 && parseInt(grupo.at(0)) > -4 && !this.moinhosAtivos.some(moinhoAtivo => moinhoAtivo.toString() === grupo.at(1).toString()))
    ]
  }

  @Span()
  registraNovaJogada(registraJogada: PartidaDto, logger: Logger) {
    this.versaoPartida.push(registraJogada.versaoPartida)

    const versaoPartidaClone = JSON.parse(JSON.stringify(this.versaoPartida));
    const mapaTabuleiro = this.montaTabuleiro();

    if (this.versaoPartida.at(-1).at(1) === null) {
      this.redefineMoinhoAtivo(logger)
      this.finalizaPartida(versaoPartidaClone, mapaTabuleiro)
      this.aguardandoResolucaoMoinho = null;
      return
    }

    const moinhoEncontrado = [];

    mapaTabuleiro.forEach(mapaLadoAutor => moinhoEncontrado.push(...this.verificaMoinho(mapaLadoAutor)));
    
    this.redefineMoinhoAtivo(logger)

    if (moinhoEncontrado.length > 0) {
      this.moinhosAtivos.push(moinhoEncontrado.at(0).at(1))
      this.aguardandoResolucaoMoinho = this.versaoPartida.at(-1).at(2);
      this.apply(new MoinhoEfetuadoEvent({ jogador_id: this.versaoPartida.at(-1).at(2) }));
    }
  }

  @Span()
  private finalizaPartida(mapaTabuleiro: any, logger: Logger) {
    mapaTabuleiro.forEach(ladoTabuleiro => {
      if (ladoTabuleiro.filter(coordenada => !coordenada).length > 3) {
        this.apply(new PartidaFinalizadaEvent({ jogador_vencedor_id: this.versaoPartida.at(-1).at(2) }))
        this.resultado = this.versaoPartida.at(-1).at(2)
      }
    });
  }

  @Span()
  private redefineMoinhoAtivo(logger: Logger) {
    this.moinhosAtivos = this.moinhosAtivos.filter(moinhoAtivo =>
      !moinhoAtivo.some(coordenada => coordenada.toString() === this.versaoPartida.at(-1).at(0).toString())
    );
  }

  @Span()
  public montaTabuleiro(): any {
    const versaoPartidaClone = JSON.parse(JSON.stringify(this.versaoPartida));
    const mapaTabuleiro = versaoPartidaClone.shift();

    versaoPartidaClone.forEach((versao) => {
      mapaTabuleiro.forEach(mapaLadoAutor => {
        for (let i = 0; i < mapaLadoAutor.length; i++) {
          if (mapaLadoAutor[i]?.toString() === versao.at(0)?.toString())
            mapaLadoAutor[i] = versao.at(1)
        }
      });
    });

    return mapaTabuleiro
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