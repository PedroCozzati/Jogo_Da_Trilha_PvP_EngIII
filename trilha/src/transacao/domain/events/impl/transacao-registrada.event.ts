import { IEvent } from '@nestjs/cqrs';
import { TransacaoDto } from 'src/transacao/application/dto/transacao.dto';

export class TransacaoRegistradaEvent implements IEvent {
  constructor(
    public readonly transacaoDto: TransacaoDto) {}
}
