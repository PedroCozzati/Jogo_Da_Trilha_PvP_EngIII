import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegistraPartidaCommand } from '../impl/registra-partida.command';
import { Partida } from '../../models/partida.model';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(RegistraPartidaCommand)
export class RegistraPartidaHandler
  implements ICommandHandler<RegistraPartidaCommand> {
  constructor(
    private readonly repository: PartidaRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: RegistraPartidaCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { registraPartidaDto } = command;
    const partidaEmAndamento = await this.repository.buscaPartidaPorJogador(registraPartidaDto.jogador_id);

    if (partidaEmAndamento){
      partidaEmAndamento.registraPartida();

      this.publisher.mergeObjectContext(partidaEmAndamento);

      partidaEmAndamento.commit();

      return partidaEmAndamento;
    }

    const partidaEmPareamento = await this.repository.buscaPartidaEmPareamento(registraPartidaDto.nivel_id);
    const partida = partidaEmPareamento
      ? new Partida({
        ...partidaEmPareamento,
        jogador2_id: partidaEmPareamento.jogador1_id.toString() != registraPartidaDto.jogador_id.toString() ? registraPartidaDto.jogador_id : null
      })
      : new Partida({
        jogador1_id: registraPartidaDto.jogador_id,
        nivel_id: registraPartidaDto.nivel_id
      })

    if (!partida._id) {
      partida.registraPosicoesIniciais();

      const partidaInserida = this.publisher.mergeObjectContext(
        await this.repository.inserePartida(partida)
      );

      partidaInserida.commit();
      return partidaInserida;
    }

    const partidaModificada = this.publisher.mergeObjectContext(
      await this.repository.atualizaPartida(partida)
    );

    partidaModificada.commit();
    return partidaModificada;
  }
}
