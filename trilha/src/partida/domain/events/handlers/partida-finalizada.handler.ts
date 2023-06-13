
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaFinalizadaEvent } from '../impl/partida-finalizada.event';
import { Logger } from 'nestjs-pino';
import { Span, MetricService } from 'nestjs-otel';
import { PartidaGateway } from '../../../gateway/partida.gateway';
import { Counter } from '@opentelemetry/api';

@EventsHandler(PartidaFinalizadaEvent)
export class PartidaFinalizadaHandler
  implements IEventHandler<PartidaFinalizadaEvent> {

  private partidaFinalizadaCounter: Counter;

  constructor(
    private readonly _logger: Logger,
    private readonly _partidaGateway: PartidaGateway,
    private readonly metricService: MetricService,
  ) {
    this.partidaFinalizadaCounter = this.metricService.getCounter('partida_finalizada_count', {
      description: 'Contador para armazenar as partidas que foram finalizadas',
    });
  }

  @Span()
  handle(event: PartidaFinalizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
    if (event.partidaFinalizadaDto.partida.resultado != "empate") {
      this.partidaFinalizadaCounter.add(1, {
        vencedor: event.partidaFinalizadaDto.jogador_vencedor_id,
        perdedor: event.partidaFinalizadaDto.jogador_perdedor_id,
        numero_lances: event.partidaFinalizadaDto.partida.versaoPartida.length - 1,
        nivel: event.partidaFinalizadaDto.partida.nivel_id
      });

      this._partidaGateway.emiteResultadoPerdedorPartida(event.partidaFinalizadaDto.jogador_perdedor_id, event.partidaFinalizadaDto.partida);
      this._partidaGateway.emiteResultadoVencedorPartida(event.partidaFinalizadaDto.jogador_vencedor_id, event.partidaFinalizadaDto.partida);
      return
    }    

    this._partidaGateway.emiteResultadoEmpatePartida(
      event.partidaFinalizadaDto.partida.jogador1_id,
      event.partidaFinalizadaDto.partida.jogador2_id,
      event.partidaFinalizadaDto.partida
    )
  }
}
