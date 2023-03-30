
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { PecaAtualizadaEvent } from '../impl/peca-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(PecaAtualizadaEvent)
export class PecaAtualizadaHandler
  implements IEventHandler<PecaAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: PecaAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
