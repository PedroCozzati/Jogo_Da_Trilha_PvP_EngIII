
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TransacaoRegistradaEvent } from '../impl/transacao-registrada.event';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@EventsHandler(TransacaoRegistradaEvent)
export class TransacaoRegistradaHandler
  implements IEventHandler<TransacaoRegistradaEvent> {

  constructor(
    private readonly _logger: Logger,
  ) { }

  @Span()
  handle(event: TransacaoRegistradaEvent) {
    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
