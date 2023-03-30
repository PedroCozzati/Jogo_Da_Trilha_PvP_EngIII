import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraPecaCommand } from 'src/peca/domain/commands/impl/registra-peca.command';
import { PecaDto } from '../dto/peca.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaPecaCommand } from '../../domain/commands/impl/atualiza-peca.command';

@Injectable()
export class PecaService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async registraPeca(peca: PecaDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new RegistraPecaCommand(peca),
    );
  }

  @Span()
  async atualizaPeca(peca: PecaDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new AtualizaPecaCommand(peca),
    );
  }
}
