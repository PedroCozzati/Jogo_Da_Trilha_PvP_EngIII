import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraJogadorCommand } from 'src/jogador/domain/commands/impl/registra-jogador.command';
import { ConsultaJogadorAtualQuery } from 'src/jogador/domain/queries/impl/consulta-jogador-atual.query';
import { JogadorDto } from '../dto/jogador.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class JogadorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async registraJogador(jogador: JogadorDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new RegistraJogadorCommand(jogador),
    );
  }

  @Span()
  async consultaJogadorAtual() {
    this._logger.log("starting service execution")

    return await this.queryBus.execute(
      new ConsultaJogadorAtualQuery(),
    );
  }
}
