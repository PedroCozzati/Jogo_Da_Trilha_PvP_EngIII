import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Jogador } from '../../models/jogador.model';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaSaldoJogadorCommand } from '../impl/atualiza-saldo-jogador.command';

@CommandHandler(AtualizaSaldoJogadorCommand)
export class AtualizaSaldoJogadorHandler
  implements ICommandHandler<AtualizaSaldoJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: AtualizaSaldoJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { atualizaSaldoJogador } = command;

    const jogadorParaAtualizarSaldo = await this.repository.buscaJogadorPorId(atualizaSaldoJogador._id);

    jogadorParaAtualizarSaldo.modificaSaldo(atualizaSaldoJogador.saldo)


    const jogador = this.publisher.mergeObjectContext(
      await this.repository.atualizaSaldoJogador(jogadorParaAtualizarSaldo)
    );

    jogador.commit();

    return jogador;
  }
}
