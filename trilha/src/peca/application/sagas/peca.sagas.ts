import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { PecaDeletadaEvent } from '../../domain/events/impl/peca-deletada.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PecaSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly httpService: HttpService,
    ) { }

    @Span()
    @Saga()
    pecaDeletada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(PecaDeletadaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    this.httpService.delete(`http://localhost:90/nivel/por-peca/${event.pecaDto._id}`,
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
