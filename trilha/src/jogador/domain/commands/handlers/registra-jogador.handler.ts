import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegistraJogadorCommand } from '../impl/registra-jogador.command';
import { Jogador } from '../../models/jogador.model';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(RegistraJogadorCommand)
export class RegistraJogadorHandler
  implements ICommandHandler<RegistraJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: RegistraJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { jogadorDto } = command;

    const jogador = this.publisher.mergeObjectContext(
      await this.repository.insereJogador(new Jogador(jogadorDto))
    );

    jogador.commit();

    return jogador;
  }
}
