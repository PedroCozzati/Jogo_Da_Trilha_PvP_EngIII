import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaJogadorPorIdQuery } from '../impl/busca-jogador-por-id.query';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaJogadorPorIdQuery)
export class BuscaJogadorPorIdHandler
    implements IQueryHandler<BuscaJogadorPorIdQuery> {
    constructor(
        private readonly repository: JogadorRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaJogadorPorIdQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { id } = query;
        return await this.repository.buscaJogadorPorId(id);
    }
}
