import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraNivelCommand } from 'src/nivel/domain/commands/impl/registra-nivel.command';
import { NivelDto } from '../dto/nivel.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaNivelCommand } from '../../domain/commands/impl/atualiza-nivel.command';
import { DeletaNivelCommand } from 'src/nivel/domain/commands/impl/deleta-nivel.command';
import { DeletaNivelPorTabuleiroCommand } from 'src/nivel/domain/commands/impl/deleta-nivel-por-tabuleiro.command';
import { DeletaNivelPorPecaCommand } from 'src/nivel/domain/commands/impl/deleta-nivel-por-peca.command';
import { BuscaNivelPorIdQuery } from 'src/nivel/domain/queries/impl/busca-nivel-por-id.query';
import { BuscaNiveisQuery } from 'src/nivel/domain/queries/impl/busca-niveis.query';

@Injectable()
export class NivelService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async buscaNivelPorId(id: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaNivelPorIdQuery(id));
  }

  @Span()
  async buscaNiveis() {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaNiveisQuery());
  }

  @Span()
  async registraNivel(nivel: NivelDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new RegistraNivelCommand(nivel));
  }

  @Span()
  async atualizaNivel(nivel: NivelDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaNivelCommand(nivel));
  }

  @Span()
  async deletaNivel(id: string) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaNivelCommand(id));
  }

  @Span()
  async deletaNivelPorPeca(pecaId: string) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaNivelPorPecaCommand(pecaId));
  }

  @Span()
  async deletaNivelPorTabuleiro(tabuleiroId: string) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaNivelPorTabuleiroCommand(tabuleiroId));
  }
}
