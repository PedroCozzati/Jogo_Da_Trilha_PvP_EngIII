
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { JogadorRegistradoEvent } from '../impl/jogador-registrado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { JogadorGateway } from '../../../gateway/jogador.gateway';

@EventsHandler(JogadorRegistradoEvent)
export class JogadorRegistradoHandler
  implements IEventHandler<JogadorRegistradoEvent> {

  constructor(
    private readonly _logger: Logger,
    private jogadorGateway: JogadorGateway,
  ) { }

  @Span()
  handle(event: JogadorRegistradoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });

    this.jogadorGateway.emiteJogadorRegistrado(event.jogadorDto);
  }
}
