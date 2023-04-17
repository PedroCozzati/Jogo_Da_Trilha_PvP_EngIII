import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Nivel } from '../../models/nivel.model';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { DeletaNivelPorTabuleiroCommand } from '../impl/deleta-nivel-por-tabuleiro.command';

@CommandHandler(DeletaNivelPorTabuleiroCommand)
export class DeletaNivelPorTabuleiroHandler
  implements ICommandHandler<DeletaNivelPorTabuleiroCommand> {
  constructor(
    private readonly repository: NivelRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaNivelPorTabuleiroCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { tabuleiroId } = command;

    const nivel = this.publisher.mergeObjectContext(
      await this.repository.deletaNivelPorTabuleiro(tabuleiroId)
    );

    nivel.commit();

    return nivel;
  }
}
