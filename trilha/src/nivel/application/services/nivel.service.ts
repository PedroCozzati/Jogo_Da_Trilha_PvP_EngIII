import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraNivelCommand } from 'src/nivel/domain/commands/impl/registra-nivel.command';
import { NivelDto } from '../dto/nivel.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaNivelCommand } from '../../domain/commands/impl/atualiza-nivel.command';
import { DeletaNivelCommand } from 'src/nivel/domain/commands/impl/deleta-nivel.command';

@Injectable()
export class NivelService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

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
  async deletaNivel(nivel: NivelDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaNivelCommand(nivel));
  }
}
