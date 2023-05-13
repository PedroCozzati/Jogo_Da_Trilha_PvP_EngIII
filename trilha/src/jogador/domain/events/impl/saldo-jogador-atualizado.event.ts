import { IEvent } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class SaldoJogadorAtualizadoEvent implements IEvent {
  constructor(
    public readonly jogadorDto: JogadorDto) { }
}
