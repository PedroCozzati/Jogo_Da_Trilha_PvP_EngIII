import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AtualizaTabuleiroCommand } from '../impl/atualiza-tabuleiro.command';
import { Tabuleiro } from '../../models/tabuleiro.model';
import { TabuleiroRepository } from 'src/tabuleiro/infra/data/repository/tabuleiro.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(AtualizaTabuleiroCommand)
export class AtualizaTabuleiroHandler
  implements ICommandHandler<AtualizaTabuleiroCommand> {
  constructor(
    private readonly repository: TabuleiroRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaTabuleiroCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { tabuleiroDto } = command;

    const tabuleiro = this.publisher.mergeObjectContext(
      await this.repository.atualizaTabuleiro(new Tabuleiro(tabuleiroDto))
    );

    tabuleiro.commit();

    return tabuleiro;
  }
}
