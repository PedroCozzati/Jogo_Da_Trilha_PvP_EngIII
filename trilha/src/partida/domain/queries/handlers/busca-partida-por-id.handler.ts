import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaPartidaPorIdQuery } from '../impl/busca-partida-por-id.query';
import { PartidaRepository } from 'src/partida/infra/data/repository/partida.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaPartidaPorIdQuery)
export class BuscaPartidaPorIdHandler
    implements IQueryHandler<BuscaPartidaPorIdQuery> {
    constructor(
        private readonly repository: PartidaRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaPartidaPorIdQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { id } = query;
        return await this.repository.buscaPartidaPorId(id);
    }
}
