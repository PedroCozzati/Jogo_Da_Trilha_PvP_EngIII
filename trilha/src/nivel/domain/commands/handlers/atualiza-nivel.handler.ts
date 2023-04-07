import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AtualizaNivelCommand } from '../impl/atualiza-nivel.command';
import { Nivel } from '../../models/nivel.model';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(AtualizaNivelCommand)
export class AtualizaNivelHandler
  implements ICommandHandler<AtualizaNivelCommand> {
  constructor(
    private readonly repository: NivelRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaNivelCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { nivelDto } = command;

    const nivel = this.publisher.mergeObjectContext(
      await this.repository.atualizaNivel(new Nivel(nivelDto))
    );

    nivel.commit();

    return nivel;
  }
}
