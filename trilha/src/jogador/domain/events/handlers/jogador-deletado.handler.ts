import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { JogadorDeletadoEvent } from '../impl/jogador-deletado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(JogadorDeletadoEvent)
export class JogadorDeletadoHandler
  implements IEventHandler<JogadorDeletadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: JogadorDeletadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
