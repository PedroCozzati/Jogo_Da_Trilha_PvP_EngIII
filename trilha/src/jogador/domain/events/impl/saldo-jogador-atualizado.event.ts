import { IEvent } from '@nestjs/cqrs';
import { AtualizaSaldoJogadorDto, JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class SaldoJogadorAtualizadoEvent implements IEvent {
  constructor(
    public readonly jogadorDto: JogadorDto,
    public readonly atualizaSaldoJogadorDto: AtualizaSaldoJogadorDto
    ) { }
}
