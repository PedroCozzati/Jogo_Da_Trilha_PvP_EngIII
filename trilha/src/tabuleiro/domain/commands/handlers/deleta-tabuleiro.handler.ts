import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Tabuleiro } from '../../models/tabuleiro.model';
import { TabuleiroRepository } from 'src/tabuleiro/infra/data/repository/tabuleiro.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { DeletaTabuleiroCommand } from '../impl/deleta-tabuleiro.command';

@CommandHandler(DeletaTabuleiroCommand)
export class DeletaTabuleiroHandler
  implements ICommandHandler<DeletaTabuleiroCommand> {
  constructor(
    private readonly repository: TabuleiroRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaTabuleiroCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { tabuleiroDto } = command;

    const tabuleiro = this.publisher.mergeObjectContext(
      await this.repository.deletaTabuleiro(new Tabuleiro(tabuleiroDto))
    );

    tabuleiro.commit();

    return tabuleiro;
  }
}
