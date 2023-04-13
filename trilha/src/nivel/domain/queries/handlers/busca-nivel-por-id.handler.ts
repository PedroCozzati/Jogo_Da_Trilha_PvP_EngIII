import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaNivelPorIdQuery } from '../impl/busca-nivel-por-id.query';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';


@QueryHandler(BuscaNivelPorIdQuery)
export class BuscaNivelPorIdHandler
    implements IQueryHandler<BuscaNivelPorIdQuery> {
    constructor(
        private readonly repository: NivelRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaNivelPorIdQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { id } = query;
        return await this.repository.buscaNivelPorId(id);
    }
}
