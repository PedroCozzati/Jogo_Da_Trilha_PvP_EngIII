
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { NivelAtualizadaEvent } from '../impl/nivel-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(NivelAtualizadaEvent)
export class NivelAtualizadaHandler
  implements IEventHandler<NivelAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: NivelAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
