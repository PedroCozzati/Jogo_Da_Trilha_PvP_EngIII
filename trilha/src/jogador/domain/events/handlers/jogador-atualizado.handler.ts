
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { JogadorAtualizadoEvent } from '../impl/jogador-atualizado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(JogadorAtualizadoEvent)
export class JogadorAtualizadoEventHandler
  implements IEventHandler<JogadorAtualizadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: JogadorAtualizadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
