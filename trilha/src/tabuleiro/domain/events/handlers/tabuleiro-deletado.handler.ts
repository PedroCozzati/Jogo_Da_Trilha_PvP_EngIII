
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TabuleiroDeletadoEvent } from '../impl/tabuleiro-deletado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(TabuleiroDeletadoEvent)
export class TabuleiroAtualizadaHandler
  implements IEventHandler<TabuleiroDeletadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: TabuleiroDeletadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
