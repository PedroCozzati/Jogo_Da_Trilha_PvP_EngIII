
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { MoinhoEfetuadoEvent } from '../impl/moinho-efetuado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(MoinhoEfetuadoEvent)
export class MoinhoEfetuadoHandler
  implements IEventHandler<MoinhoEfetuadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: MoinhoEfetuadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
