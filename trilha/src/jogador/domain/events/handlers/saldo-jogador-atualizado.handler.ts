
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { SaldoJogadorAtualizadoEvent } from '../impl/saldo-jogador-atualizado.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(SaldoJogadorAtualizadoEvent)
export class SaldoJogadorAtualizadoEventHandler
  implements IEventHandler<SaldoJogadorAtualizadoEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: SaldoJogadorAtualizadoEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
