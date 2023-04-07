import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { PecaDeletadaEvent } from '../../domain/events/impl/peca-deletada.event';

@Injectable()
export class PecaSagas {
    constructor(
        private readonly _logger: Logger,
    ) { }

    @Span()
    @Saga()
    pecaDeletada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(PecaDeletadaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                })
            )
    }
}
