import { IEvent } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class JogadorRegistradoEvent implements IEvent {
  constructor(
    public readonly jogadorDto: JogadorDto) {}
}
