import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConsultaJogadorAtualQuery } from '../impl/consulta-jogador-atual.query';
import { JogadorRepository } from 'src/jogador/infra/data/repository/jogador.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@QueryHandler(ConsultaJogadorAtualQuery)
export class ConsultaJogadorAtualHandler
    implements IQueryHandler<ConsultaJogadorAtualQuery> {
    constructor(
        private readonly repository: JogadorRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: ConsultaJogadorAtualQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });
        const jogadorAtual = await this.repository.consultaJogadorAtual();
        return jogadorAtual;
    }
}