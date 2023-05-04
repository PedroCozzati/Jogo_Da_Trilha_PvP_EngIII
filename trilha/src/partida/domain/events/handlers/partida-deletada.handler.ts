
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaDeletadaEvent } from '../impl/partida-deletada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PartidaDeletadaEvent)
export class PartidaDeletadaHandler
  implements IEventHandler<PartidaDeletadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PartidaDeletadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
