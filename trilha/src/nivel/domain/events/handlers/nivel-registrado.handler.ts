
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NivelRegistradoEvent } from '../impl/nivel-registrado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(NivelRegistradoEvent)
export class NivelRegistradoHandler
  implements IEventHandler<NivelRegistradoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: NivelRegistradoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
