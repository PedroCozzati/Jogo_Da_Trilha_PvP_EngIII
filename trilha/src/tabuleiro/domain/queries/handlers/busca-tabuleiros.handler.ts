import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaTabuleirosQuery } from '../impl/busca-tabuleiros.query';
import { TabuleiroRepository } from 'src/tabuleiro/infra/data/repository/tabuleiro.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaTabuleirosQuery)
export class BuscaTabuleirosHandler
    implements IQueryHandler<BuscaTabuleirosQuery> {
    constructor(
        private readonly repository: TabuleiroRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaTabuleirosQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        return await this.repository.buscaTabuleiros();
    }
}
