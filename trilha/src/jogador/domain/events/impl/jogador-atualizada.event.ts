import { IEvent } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class JogadorAtualizadaEvent implements IEvent {
  constructor(
    public readonly jogadorDto: JogadorDto) { }
}
