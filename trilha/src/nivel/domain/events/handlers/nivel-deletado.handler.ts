
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NivelDeletadoEvent } from '../impl/nivel-deletado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(NivelDeletadoEvent)
export class NivelAtualizadaHandler
  implements IEventHandler<NivelDeletadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: NivelDeletadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
