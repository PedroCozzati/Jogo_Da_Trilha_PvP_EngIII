import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaPartidasQuery } from '../impl/busca-partidas.query';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaPartidasQuery)
export class BuscaPartidasHandler
    implements IQueryHandler<BuscaPartidasQuery> {
    constructor(
        private readonly repository: PartidaRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaPartidasQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        return await this.repository.buscaPartidas();
    }
}
