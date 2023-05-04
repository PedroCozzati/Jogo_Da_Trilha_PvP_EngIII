import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AtualizaJogadorCommand } from '../impl/atualiza-jogador.command';
import { Jogador } from '../../models/jogador.model';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(AtualizaJogadorCommand)
export class AtualizaJogadorHandler
  implements ICommandHandler<AtualizaJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { jogadorDto } = command;

    const jogador = this.publisher.mergeObjectContext(
      await this.repository.atualizaJogador(new Jogador(jogadorDto))
    );

    jogador.commit();

    return jogador;
  }
}
