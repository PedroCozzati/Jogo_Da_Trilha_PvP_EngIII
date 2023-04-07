
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TabuleiroAtualizadaEvent } from '../impl/tabuleiro-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(TabuleiroAtualizadaEvent)
export class TabuleiroAtualizadaHandler
  implements IEventHandler<TabuleiroAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: TabuleiroAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
