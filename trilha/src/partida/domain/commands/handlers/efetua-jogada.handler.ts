import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { EfetuaJogadaCommand } from '../impl/efetua-jogada.command';
import { Partida } from '../../models/partida.model';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(EfetuaJogadaCommand)
export class EfetuaJogadaHandler
  implements ICommandHandler<EfetuaJogadaCommand> {
  constructor(
    private readonly repository: PartidaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: EfetuaJogadaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { partidaDto } = command;

    const partidaCompleta = await this.repository.buscaPartidaPorId(partidaDto._id)

    partidaCompleta.registraNovaJogada(partidaDto)

    const partida = this.publisher.mergeObjectContext(
      await this.repository.efetuaJogada(partidaCompleta)
    );

    partida.commit();

    return partida;
  }
}
