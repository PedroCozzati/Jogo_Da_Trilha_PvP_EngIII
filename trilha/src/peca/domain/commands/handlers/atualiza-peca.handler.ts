import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AtualizaPecaCommand } from '../impl/atualiza-peca.command';
import { Peca } from '../../models/peca.model';
import { PecaRepository } from 'src/peca/infra/data/repository/peca.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(AtualizaPecaCommand)
export class AtualizaPecaHandler
  implements ICommandHandler<AtualizaPecaCommand> {
  constructor(
    private readonly repository: PecaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaPecaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { pecaDto } = command;

    const peca = this.publisher.mergeObjectContext(
      await this.repository.atualizaPeca(new Peca(pecaDto))
    );

    peca.commit();

    return peca;
  }
}
