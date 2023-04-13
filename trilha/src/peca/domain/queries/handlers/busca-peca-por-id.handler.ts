import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaPecaPorIdQuery } from '../impl/busca-peca-por-id.query';
import { PecaRepository } from 'src/peca/infra/data/repository/peca.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaPecaPorIdQuery)
export class BuscaPecaPorIdHandler
    implements IQueryHandler<BuscaPecaPorIdQuery> {
    constructor(
        private readonly repository: PecaRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaPecaPorIdQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { id } = query;
        return await this.repository.buscaPecaPorId(id);
    }
}
