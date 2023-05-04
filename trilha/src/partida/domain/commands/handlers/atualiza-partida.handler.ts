import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AtualizaPartidaCommand } from '../impl/atualiza-partida.command';
import { Partida } from '../../models/partida.model';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(AtualizaPartidaCommand)
export class AtualizaPartidaHandler
  implements ICommandHandler<AtualizaPartidaCommand> {
  constructor(
    private readonly repository: PartidaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaPartidaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { partidaDto } = command;

    const partida = this.publisher.mergeObjectContext(
      await this.repository.atualizaPartida(new Partida(partidaDto))
    );

    partida.commit();

    return partida;
  }
}
