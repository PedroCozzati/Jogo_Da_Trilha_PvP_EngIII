
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaFinalizadaEvent } from '../impl/partida-finalizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { PartidaGateway } from '../../../gateway/partida.gateway';

@EventsHandler(PartidaFinalizadaEvent)
export class PartidaFinalizadaHandler
  implements IEventHandler<PartidaFinalizadaEvent> {

  constructor(
    private readonly _logger: Logger,
    private readonly _partidaGateway: PartidaGateway,
  ) { }

  @Span()
  handle(event: PartidaFinalizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
    if (event.partidaFinalizadaDto.partida.resultado != "empate") {
      this._partidaGateway.emiteResultadoPerdedorPartida(event.partidaFinalizadaDto.jogador_perdedor_id);
      this._partidaGateway.emiteResultadoVencedorPartida(event.partidaFinalizadaDto.jogador_vencedor_id);
      return
    }

    this._partidaGateway.emiteResultadoEmpatePartida(
      event.partidaFinalizadaDto.partida.jogador1_id,
      event.partidaFinalizadaDto.partida.jogador2_id
    )
  }
}
