import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { JogadorDeletadoEvent } from '../../domain/events/impl/jogador-deletado.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JogadorSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly httpService: HttpService,
    ) { }

    @Span()
    @Saga()
    jogadorDeletado(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(JogadorDeletadoEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    this.httpService.delete(`http://localhost:90/nivel/por-jogador/${event.jogadorDto._id}`,
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
