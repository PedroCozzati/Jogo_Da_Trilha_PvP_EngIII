import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaSaldoJogadorCommand } from '../impl/atualiza-saldo-jogador.command';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@CommandHandler(AtualizaSaldoJogadorCommand)
export class AtualizaSaldoJogadorHandler
  implements ICommandHandler<AtualizaSaldoJogadorCommand> {
  constructor(
    private readonly repository: JogadorRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
    private readonly _httpService: HttpService,
  ) { }

  @Span()
  async execute(command: AtualizaSaldoJogadorCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });
    
    const { atualizaSaldoJogador } = command;
    const jogadorParaAtualizarSaldo = await this.repository.buscaJogadorPorId(atualizaSaldoJogador._id);

    const responsePartidaEncontrada = await lastValueFrom(
      this._httpService.get(
        `http:/trilha:90/partida/por-jogador/${atualizaSaldoJogador._id}`,
        {
          headers: { "Content-Type": 'application/json' }
        })
    );

    if(await responsePartidaEncontrada.data?._id)
        return jogadorParaAtualizarSaldo;

    jogadorParaAtualizarSaldo.modificaSaldo(atualizaSaldoJogador.saldo)

    const jogador = this.publisher.mergeObjectContext(
      await this.repository.atualizaSaldoJogador(jogadorParaAtualizarSaldo)
    );

    jogador.commit();

    return jogador;
  }
}
