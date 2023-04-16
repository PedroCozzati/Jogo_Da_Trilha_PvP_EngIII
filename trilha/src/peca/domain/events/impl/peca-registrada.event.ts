import { IEvent } from '@nestjs/cqrs';
import { PecaDto } from 'src/peca/application/dto/peca.dto';

export class PecaRegistradaEvent implements IEvent {
  constructor(
    public readonly pecaDto: PecaDto) {}
}
