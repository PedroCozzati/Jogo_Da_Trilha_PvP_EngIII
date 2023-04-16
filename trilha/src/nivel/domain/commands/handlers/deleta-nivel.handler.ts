import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Nivel } from '../../models/nivel.model';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { DeletaNivelCommand } from '../impl/deleta-nivel.command';

@CommandHandler(DeletaNivelCommand)
export class DeletaNivelHandler
  implements ICommandHandler<DeletaNivelCommand> {
  constructor(
    private readonly repository: NivelRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaNivelCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { nivelDto } = command;

    const nivel = this.publisher.mergeObjectContext(
      await this.repository.deletaNivel(new Nivel(nivelDto))
    );

    nivel.commit();

    return nivel;
  }
}
