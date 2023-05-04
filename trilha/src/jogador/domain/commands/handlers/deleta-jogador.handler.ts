import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Jogador } from '../../models/jogador.model';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { DeletaJogadorCommand } from '../impl/deleta-jogador.command';

@CommandHandler(DeletaJogadorCommand)
export class DeletaJogadorHandler
  implements ICommandHandler<DeletaJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: DeletaJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { id } = command;

    const jogadorParaExclusao = await this.repository.buscaJogadorPorId(id);

    const jogador = this.publisher.mergeObjectContext(
      await this.repository.deletaJogador(jogadorParaExclusao)
    );

    jogador.commit();

    return jogador;
  }
}
