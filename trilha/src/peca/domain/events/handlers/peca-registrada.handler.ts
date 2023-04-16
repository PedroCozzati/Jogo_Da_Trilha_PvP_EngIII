
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PecaRegistradaEvent } from '../impl/peca-registrada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PecaRegistradaEvent)
export class PecaRegistradaHandler
  implements IEventHandler<PecaRegistradaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PecaRegistradaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
