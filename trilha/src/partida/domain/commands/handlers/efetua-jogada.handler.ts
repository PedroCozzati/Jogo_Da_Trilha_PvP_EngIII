import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Logger } from 'nestjs-pino';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { EfetuaJogadaCommand } from '../impl/efetua-jogada.command';

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

    partidaCompleta.registraNovaJogada(partidaDto, this._logger)

    const partida = this.publisher.mergeObjectContext(
      await this.repository.efetuaJogada(partidaCompleta)
    );

    partida.commit();

    return partida;
  }
}
