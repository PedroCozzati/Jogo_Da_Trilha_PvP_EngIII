import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaTabuleiroPorIdQuery } from '../impl/busca-tabuleiro-por-id.query';
import { TabuleiroRepository } from 'src/tabuleiro/infra/data/repository/tabuleiro.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaTabuleiroPorIdQuery)
export class BuscaTabuleiroPorIdHandler
    implements IQueryHandler<BuscaTabuleiroPorIdQuery> {
    constructor(
        private readonly repository: TabuleiroRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaTabuleiroPorIdQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { id } = query;
        return await this.repository.buscaTabuleiroPorId(id);
    }
}
