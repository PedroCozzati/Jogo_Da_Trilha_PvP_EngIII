
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TabuleiroRegistradoEvent } from '../impl/tabuleiro-registrado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(TabuleiroRegistradoEvent)
export class TabuleiroRegistradoHandler
  implements IEventHandler<TabuleiroRegistradoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: TabuleiroRegistradoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
