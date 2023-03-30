import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegistraPecaCommand } from '../impl/registra-peca.command';
import { Peca } from '../../models/peca.model';
import { PecaRepository } from 'src/peca/infra/data/repository/peca.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(RegistraPecaCommand)
export class RegistraPecaHandler
  implements ICommandHandler<RegistraPecaCommand> {
  constructor(
    private readonly repository: PecaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: RegistraPecaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { pecaDto } = command;

    const peca = this.publisher.mergeObjectContext(
      await this.repository.inserePeca(new Peca(pecaDto))
    );

    peca.commit();

    return peca;
  }
}
