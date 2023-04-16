
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NivelDeletadoPorPecaEvent } from '../impl/nivel-deletado-por-peca.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(NivelDeletadoPorPecaEvent)
export class NivelDeletadoPorPecaHandler
  implements IEventHandler<NivelDeletadoPorPecaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: NivelDeletadoPorPecaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
