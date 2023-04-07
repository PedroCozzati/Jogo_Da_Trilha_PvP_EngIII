
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NivelDeletadoPorTabuleiroEvent } from '../impl/nivel-deletado-por-tabuleiro.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(NivelDeletadoPorTabuleiroEvent)
export class NivelDeletadoPorTabuleiroHandler
  implements IEventHandler<NivelDeletadoPorTabuleiroEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: NivelDeletadoPorTabuleiroEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
