import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeletaPecaCommand } from '../impl/deleta-peca.command';
import { PecaRepository } from 'src/peca/infra/data/repository/peca.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(DeletaPecaCommand)
export class DeletaPecaHandler
  implements ICommandHandler<DeletaPecaCommand> {
  constructor(
    private readonly repository: PecaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaPecaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { id } = command;

    const pecaParaExclusao = await this.repository.buscaPecaPorId(id);

    const peca = this.publisher.mergeObjectContext(
      await this.repository.deletaPeca(pecaParaExclusao)
    );

    peca.commit();

    return peca;
  }
}
