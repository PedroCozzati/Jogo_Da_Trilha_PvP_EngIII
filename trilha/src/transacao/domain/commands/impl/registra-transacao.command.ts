import { ICommand } from '@nestjs/cqrs';
import { TransacaoDto } from 'src/transacao/application/dto/transacao.dto';

export class RegistraTransacaoCommand implements ICommand {
  constructor(
    public readonly transacaoDto: TransacaoDto,
  ) {}
}
