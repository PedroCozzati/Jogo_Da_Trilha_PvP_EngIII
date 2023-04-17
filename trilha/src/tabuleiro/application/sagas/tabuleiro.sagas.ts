import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { TabuleiroDeletadoEvent } from '../../domain/events/impl/tabuleiro-deletado.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TabuleiroSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly httpService: HttpService,
    ) { }

    @Span()
    @Saga()
    tabuleiroDeletado(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(TabuleiroDeletadoEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    this.httpService.delete(`http://localhost:90/nivel/por-tabuleiro/${event.tabuleiroDto._id}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }).subscribe()
                })
            )
    }
}
