
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaAtualizadaEvent } from '../impl/partida-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PartidaAtualizadaEvent)
export class PartidaAtualizadaHandler
  implements IEventHandler<PartidaAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PartidaAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
