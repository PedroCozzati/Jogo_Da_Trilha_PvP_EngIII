import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { PartidaDeletadaEvent } from '../../domain/events/impl/partida-deletada.event';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PartidaSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly httpService: HttpService,
    ) { }

    @Span()
    @Saga()
    partidaDeletada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(PartidaDeletadaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    this.httpService.delete("http://localhost:90/nivel/por-partida",
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            data: {
                                "partida_id": event.partidaDto._id
                            }
                        }).subscribe()
                })
            )
    }
}
