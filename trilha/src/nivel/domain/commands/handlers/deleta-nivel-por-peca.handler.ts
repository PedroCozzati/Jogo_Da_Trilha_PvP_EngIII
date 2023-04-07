import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Nivel } from '../../models/nivel.model';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { DeletaNivelPorPecaCommand } from '../impl/deleta-nivel-por-peca.command';

@CommandHandler(DeletaNivelPorPecaCommand)
export class DeletaNivelPorPecaHandler
  implements ICommandHandler<DeletaNivelPorPecaCommand> {
  constructor(
    private readonly repository: NivelRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaNivelPorPecaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { nivelDto } = command;

    const nivel = this.publisher.mergeObjectContext(
      await this.repository.deletaNivelPorPeca(new Nivel(nivelDto))
    );

    nivel.commit();

    return nivel;
  }
}
