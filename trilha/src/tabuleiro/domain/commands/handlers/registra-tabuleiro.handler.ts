import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegistraTabuleiroCommand } from '../impl/registra-tabuleiro.command';
import { Tabuleiro } from '../../models/tabuleiro.model';
import { TabuleiroRepository } from 'src/tabuleiro/infra/data/repository/tabuleiro.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(RegistraTabuleiroCommand)
export class RegistraTabuleiroHandler
  implements ICommandHandler<RegistraTabuleiroCommand> {
  constructor(
    private readonly repository: TabuleiroRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: RegistraTabuleiroCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { tabuleiroDto } = command;

    const tabuleiro = this.publisher.mergeObjectContext(
      await this.repository.insereTabuleiro(new Tabuleiro(tabuleiroDto))
    );

    tabuleiro.commit();

    return tabuleiro;
  }
}
