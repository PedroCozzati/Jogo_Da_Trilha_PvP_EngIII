import { IEvent } from '@nestjs/cqrs';
import { MoinhoEfetuadoDto } from 'src/partida/application/dto/partida.dto';

export class MoinhoEfetuadoEvent implements IEvent {
  constructor(
    public readonly moinhoEfetuadoDto: MoinhoEfetuadoDto
  ) { }
}
