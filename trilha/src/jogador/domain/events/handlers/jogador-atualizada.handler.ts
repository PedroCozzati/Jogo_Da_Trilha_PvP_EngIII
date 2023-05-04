
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { JogadorAtualizadaEvent } from '../impl/jogador-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(JogadorAtualizadaEvent)
export class JogadorAtualizadaHandler
  implements IEventHandler<JogadorAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: JogadorAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
