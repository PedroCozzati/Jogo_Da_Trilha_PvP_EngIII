import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BuscaJogadorPorNomeESenhaQuery } from '../impl/busca-jogador-por-nome-senha.query';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';


@QueryHandler(BuscaJogadorPorNomeESenhaQuery)
export class BuscaJogadorPorNomeESenhaHandler
    implements IQueryHandler<BuscaJogadorPorNomeESenhaQuery> {
    constructor(
        private readonly repository: JogadorRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: BuscaJogadorPorNomeESenhaQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });

        const { nome, senha } = query;
        return await this.repository.buscaJogadorPorNomeESenha(nome, senha);
    }
}
