import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { ofType, Saga } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { PartidaService } from '../services/partida.service';
import { PartidaGateway } from 'src/partida/gateway/partida.gateway';
import { JogadaEfetuadaEvent } from 'src/partida/domain/events/impl/jogada-efetuada.event';
import { PartidaRegistradaEvent } from 'src/partida/domain/events/impl/partida-registrada.event';
import { MoinhoEfetuadoEvent } from 'src/partida/domain/events/impl/moinho-efetuado.event';

@Injectable()
export class PartidaSagas {
    constructor(
        private readonly _logger: Logger,
        private readonly partidaService: PartidaService,
        private readonly partidaGateway: PartidaGateway,
    ) { }

    @Span()
    @Saga()
    partidaRegistrada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(PartidaRegistradaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });

                    this.partidaGateway.emiteEstadoAtual(this.partidaService.buscaPartidaPorJogador({ id_jogador: event.partidaDto.jogador1_id }), event.partidaDto.jogador1_id);

                    if (event.partidaDto.jogador2_id)
                        this.partidaGateway.emiteEstadoAtual(this.partidaService.buscaPartidaPorJogador({ id_jogador: event.partidaDto.jogador2_id }), event.partidaDto.jogador2_id);
                })
            )
    }

    @Span()
    @Saga()
    jogadaEfetuada(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(JogadaEfetuadaEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });

                    this.partidaGateway.emiteEstadoAtual(this.partidaService.buscaPartidaPorJogador({ id_jogador: event.partidaDto.jogador1_id }), event.partidaDto.jogador1_id);
                    this.partidaGateway.emiteEstadoAtual(this.partidaService.buscaPartidaPorJogador({ id_jogador: event.partidaDto.jogador2_id }), event.partidaDto.jogador2_id);
                })
            )
    }

    @Span()
    @Saga()
    moinhoEfetuado(events$: Observable<any>): Observable<void> {
        return events$
            .pipe(
                ofType(MoinhoEfetuadoEvent),
                map(event => {
                    this._logger.log("inside saga", { event: JSON.stringify(event) });

                    this.partidaGateway.emiteMoinho(this.partidaService.buscaPartidaPorJogador({ id_jogador: event.moinhoEfetuadoDto.jogador_id }), event.moinhoEfetuadoDto.jogador_id);
                })
            )
    }
}
