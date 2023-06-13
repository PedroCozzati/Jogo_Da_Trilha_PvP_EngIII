
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { SaldoJogadorAtualizadoEvent } from '../impl/saldo-jogador-atualizado.event';
import { Logger } from 'nestjs-pino';
import { Span, MetricService } from 'nestjs-otel';
import { Counter } from '@opentelemetry/api';

@EventsHandler(SaldoJogadorAtualizadoEvent)
export class SaldoJogadorAtualizadoEventHandler
  implements IEventHandler<SaldoJogadorAtualizadoEvent> {
  private compraEfetuadaCounter: Counter;
  private compraEfetuadaValorPonderadoCounter: Counter;

  constructor(
    private readonly _logger: Logger,
    private readonly metricService: MetricService,
  ) {
    this.compraEfetuadaCounter = this.metricService.getCounter('compra_efetuada_por_jogador_count', {
      description: 'Contador para verificar o dinheiro que foi gasto',
    });
    
    this.compraEfetuadaValorPonderadoCounter = this.metricService.getCounter('compra_efetuada_valor_ponderado_count', {
      description: 'Contador para verificar o dinheiro que foi gasto',
    });
  }

  @Span()
  handle(event: SaldoJogadorAtualizadoEvent) {
    if (event.atualizaSaldoJogadorDto.comprando){
      this.compraEfetuadaCounter.add(event.atualizaSaldoJogadorDto.saldo, { jogador: event.jogadorDto.nome, vitorias: event.jogadorDto.vitorias });
      this.compraEfetuadaValorPonderadoCounter.add(event.atualizaSaldoJogadorDto.saldo);
    }

    this._logger.log("executing event handler", { event_data: JSON.stringify(event) });
  }
}
