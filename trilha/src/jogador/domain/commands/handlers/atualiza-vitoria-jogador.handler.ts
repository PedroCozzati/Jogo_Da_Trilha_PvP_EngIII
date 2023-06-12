import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { Logger } from 'nestjs-pino';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';

import { AtualizaVitoriaJogadorCommand } from '../impl/atualiza-vitoria-jogador.command';

@CommandHandler(AtualizaVitoriaJogadorCommand)
export class AtualizaVitoriaJogadorHandler
  implements ICommandHandler<AtualizaVitoriaJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaVitoriaJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { atualizaVitoriaJogador } = command;

    const jogadorParaAtualizarVitoria = await this.repository.buscaJogadorPorId(atualizaVitoriaJogador._id);

    jogadorParaAtualizarVitoria.modificaVitoria()


    const jogador = this.publisher.mergeObjectContext(
      await this.repository.atualizaVitoriaJogador(jogadorParaAtualizarVitoria)
    );

    jogador.commit();

    return jogador;
  }
}
