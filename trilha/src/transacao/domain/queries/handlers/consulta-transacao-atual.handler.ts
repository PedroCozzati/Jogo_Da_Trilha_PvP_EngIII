import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConsultaTransacaoAtualQuery } from '../impl/consulta-transacao-atual.query';
import { TransacaoRepository } from 'src/transacao/infra/data/repository/transacao.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@QueryHandler(ConsultaTransacaoAtualQuery)
export class ConsultaTransacaoAtualHandler
    implements IQueryHandler<ConsultaTransacaoAtualQuery> {
    constructor(
        private readonly repository: TransacaoRepository,
        private readonly _logger: Logger,
    ) { }

    @Span()
    async execute(query: ConsultaTransacaoAtualQuery) {
        this._logger.log("executing query handler", { query_data: JSON.stringify(query) });
        const transacaoAtual = await this.repository.consultaTransacaoAtual();
        return transacaoAtual;
    }
}