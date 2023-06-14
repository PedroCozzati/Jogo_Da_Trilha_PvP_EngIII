
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PecaDeletadaEvent } from '../impl/peca-deletada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PecaDeletadaEvent)
export class PecaDeletadaHandler
  implements IEventHandler<PecaDeletadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PecaDeletadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
