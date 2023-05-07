
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { JogadaEfetuadaEvent } from '../impl/jogada-efetuada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(JogadaEfetuadaEvent)
export class JogadaEfetuadaHandler
  implements IEventHandler<JogadaEfetuadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: JogadaEfetuadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
