import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaNiveisQuery } from '../impl/busca-niveis.query';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { NivelRepository } from 'src/nivel/infra/data/repository/nivel.repository';


@QueryHandler(BuscaNiveisQuery)
export class BuscaNiveisHandler
    implements IQueryHandler<BuscaNiveisQuery> {
    constructor(
        private readonly repository: NivelRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaNiveisQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        return await this.repository.buscaNiveis();
    }
}
