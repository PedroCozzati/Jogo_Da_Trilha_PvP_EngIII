import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaPecasQuery } from '../impl/busca-pecas.query';
import { PecaRepository } from 'src/peca/infra/data/repository/peca.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaPecasQuery)
export class BuscaPecasHandler
    implements IQueryHandler<BuscaPecasQuery> {
    constructor(
        private readonly repository: PecaRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaPecasQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        return await this.repository.buscaPecas();
    }
}
