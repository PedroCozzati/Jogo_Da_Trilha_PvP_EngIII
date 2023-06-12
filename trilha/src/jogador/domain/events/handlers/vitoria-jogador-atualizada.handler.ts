
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { VitoriaJogadorAtualizadaEvent } from '../impl/vitoria-jogador-atualizada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(VitoriaJogadorAtualizadaEvent)
export class VitoriaJogadorAtualizadaEventHandler
  implements IEventHandler<VitoriaJogadorAtualizadaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: VitoriaJogadorAtualizadaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
