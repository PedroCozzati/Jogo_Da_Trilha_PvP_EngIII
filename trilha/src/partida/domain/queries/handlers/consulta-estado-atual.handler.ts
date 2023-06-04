import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConsultaEstadoAtualQuery } from '../impl/consulta-estado-atual.query';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(ConsultaEstadoAtualQuery)
export class ConsultaEstadoAtualHandler
    implements IQueryHandler<ConsultaEstadoAtualQuery> {
    constructor(
        private readonly repository: PartidaRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: ConsultaEstadoAtualQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { jogadorDto } = query;

        const partidaEncontrada = await this.repository.buscaPartidaPorJogador(jogadorDto.id_jogador)

        return partidaEncontrada?.montaTabuleiro();
    }
}
