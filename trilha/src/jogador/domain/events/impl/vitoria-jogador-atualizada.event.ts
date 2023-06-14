import { IEvent } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class VitoriaJogadorAtualizadaEvent implements IEvent {
  constructor(
    public readonly jogadorDto: JogadorDto) { }
}
