import { Injectable } from '@nestjs/common';
import { MetricService, Span } from 'nestjs-otel';
import { Counter,  } from '@opentelemetry/api';
import { Logger } from 'nestjs-pino';
import { Observable, map } from 'rxjs';
import { Saga, ofType } from '@nestjs/cqrs';
import { TransacaoRegistradaEvent } from '../../domain/events/impl/transacao-registrada.event';

@Injectable()
export class TransacaoSagas {
    private numeroTransacoesCounter: Counter;
    private valorGastoCounter: Counter;

    constructor(
        private readonly metricService: MetricService,
        private readonly _logger: Logger,
    ) {
        this.numeroTransacoesCounter = this.metricService.getCounter('trilha_count_transacoes_efetuadas', {
            description: 'A métrica que fica responsável por armazenar a quantidade de transações efetuadas por usuário',
        });
        
        this.valorGastoCounter = this.metricService.getCounter('trilha_count_valor_transacoes_efetuadas', {
            description: 'A métrica que fica responsável por armazenar o valor total das transações efetuadas por usuário',
        });
    }

    @Span()
    @Saga()
    transacaoRegistrada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(TransacaoRegistradaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    
                    this.numeroTransacoesCounter.add(1, { jogador: event.transacaoDto.jogador, valor: event.transacaoDto.valor });

                    this.valorGastoCounter.add(event.transacaoDto.valor, { jogador: event.transacaoDto.jogador, valor: event.transacaoDto.valor });
                })
            )
    }
}
