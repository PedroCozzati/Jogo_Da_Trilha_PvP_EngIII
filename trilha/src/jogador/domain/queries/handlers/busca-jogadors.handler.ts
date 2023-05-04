import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaJogadorsQuery } from '../impl/busca-jogadors.query';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaJogadorsQuery)
export class BuscaJogadorsHandler
    implements IQueryHandler<BuscaJogadorsQuery> {
    constructor(
        private readonly repository: JogadorRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaJogadorsQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        return await this.repository.buscaJogadors();
    }
}
