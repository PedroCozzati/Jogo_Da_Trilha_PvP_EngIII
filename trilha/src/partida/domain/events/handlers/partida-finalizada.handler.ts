
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaFinalizadaEvent } from '../impl/partida-finalizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PartidaFinalizadaEvent)
export class PartidaFinalizadaHandler
  implements IEventHandler<PartidaFinalizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PartidaFinalizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
