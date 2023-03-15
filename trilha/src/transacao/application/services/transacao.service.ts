import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraTransacaoCommand } from 'src/transacao/domain/commands/impl/registra-transacao.command';
import { ConsultaTransacaoAtualQuery } from 'src/transacao/domain/queries/impl/consulta-transacao-atual.query';
import { TransacaoDto } from '../dto/transacao.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class TransacaoService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async registraTransacao(transacao: TransacaoDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new RegistraTransacaoCommand(transacao),
    );
  }
  
  @Span()
  async consultaTransacaoAtual() {
    return await this.queryBus.execute(
      new ConsultaTransacaoAtualQuery(),
    );
  }
}
