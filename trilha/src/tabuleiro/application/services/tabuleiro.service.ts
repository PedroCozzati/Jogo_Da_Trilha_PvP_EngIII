import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraTabuleiroCommand } from 'src/tabuleiro/domain/commands/impl/registra-tabuleiro.command';
import { TabuleiroDto } from '../dto/tabuleiro.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaTabuleiroCommand } from '../../domain/commands/impl/atualiza-tabuleiro.command';
import { DeletaTabuleiroCommand } from 'src/tabuleiro/domain/commands/impl/deleta-tabuleiro.command';

@Injectable()
export class TabuleiroService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async registraTabuleiro(tabuleiro: TabuleiroDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new RegistraTabuleiroCommand(tabuleiro));
  }

  @Span()
  async atualizaTabuleiro(tabuleiro: TabuleiroDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaTabuleiroCommand(tabuleiro));
  }

  @Span()
  async deletaTabuleiro(tabuleiro: TabuleiroDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaTabuleiroCommand(tabuleiro));
  }
}
