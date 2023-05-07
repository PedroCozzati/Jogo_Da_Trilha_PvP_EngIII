import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { PartidaRegistradaEvent } from 'src/partida/domain/events/impl/partida-registrada.event';
import { PartidaService } from '../services/partida.service';

@Injectable()
export class PartidaSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly partidaService: PartidaService,
        //  private readonly partidaGateway: partidaGateway,
    ) { }

    @Span()
    @Saga()
    partidaRegistrada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(PartidaRegistradaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });
                    // const estadoAtualPartida = this.partidaService.consultaEstadoAtual();
                    // this.partidaGateway.emiteEstadoAtual(estadoAtualPartida);
                })
            )
    }
}
