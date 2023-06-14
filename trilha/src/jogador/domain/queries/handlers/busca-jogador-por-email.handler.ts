import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaJogadorPorEmailQuery } from '../impl/busca-jogador-por-email.query';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaJogadorPorEmailQuery)
export class BuscaJogadorPorEmailHandler
    implements IQueryHandler<BuscaJogadorPorEmailQuery> {
    constructor(
        private readonly repository: JogadorRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaJogadorPorEmailQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { email } = query;
        return await this.repository.buscaJogadorPorEmail(email);
    }
}
