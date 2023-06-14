
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PartidaRegistradaEvent } from '../impl/partida-registrada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PartidaRegistradaEvent)
export class PartidaRegistradaHandler
  implements IEventHandler<PartidaRegistradaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PartidaRegistradaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
