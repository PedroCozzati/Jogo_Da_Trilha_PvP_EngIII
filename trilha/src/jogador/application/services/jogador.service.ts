import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraJogadorCommand } from 'src/jogador/domain/commands/impl/registra-jogador.command';
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
}
