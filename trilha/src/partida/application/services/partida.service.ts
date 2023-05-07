import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraPartidaCommand } from 'src/partida/domain/commands/impl/registra-partida.command';
import { PartidaDto } from '../dto/partida.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaPartidaCommand } from '../../domain/commands/impl/atualiza-partida.command';
import { DeletaPartidaCommand } from 'src/partida/domain/commands/impl/deleta-partida.command';
import { BuscaPartidaPorIdQuery } from 'src/partida/domain/queries/impl/busca-partida-por-id.query';
import { BuscaPartidasQuery } from 'src/partida/domain/queries/impl/busca-partidas.query';
import { ConsultaEstadoAtualQuery } from 'src/partida/domain/queries/impl/consulta-estado-atual.query';

@Injectable()
export class PartidaService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async buscaPartidaPorId(id: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaPartidaPorIdQuery(id));
  }

  @Span()
  async buscaPartidas() {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaPartidasQuery());
  }


  @Span()
  async registraPartida(partida: PartidaDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new RegistraPartidaCommand(partida));
  }

  @Span()
  async atualizaPartida(partida: PartidaDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaPartidaCommand(partida));
  }

  @Span()
  async consultaEstadoAtual(partida: PartidaDto) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new ConsultaEstadoAtualQuery(partida));
  }


  @Span()
  async deletaPartida(partida: PartidaDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new DeletaPartidaCommand(partida),
    );
  }

}
