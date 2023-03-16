import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegistraTransacaoCommand } from '../impl/registra-transacao.command';
import { Transacao } from '../../models/transacao.model';
import { TransacaoRepository } from 'src/transacao/infra/data/repository/transacao.repository';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@CommandHandler(RegistraTransacaoCommand)
export class RegistraTransacaoHandler
  implements ICommandHandler<RegistraTransacaoCommand> {
  constructor(
    private readonly repository: TransacaoRepository,
    private readonly publisher: EventPublisher,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async execute(command: RegistraTransacaoCommand) {
    this._logger.log("executing command handler", { command_data: JSON.stringify(command) });

    const { transacaoDto } = command;

    const transacao = this.publisher.mergeObjectContext(
      await this.repository.insereTransacao(new Transacao(transacaoDto))
    );

    transacao.commit();

    return transacao;
  }
}
