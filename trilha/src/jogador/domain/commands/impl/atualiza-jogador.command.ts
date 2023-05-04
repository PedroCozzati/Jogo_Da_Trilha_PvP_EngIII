import { ICommand } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class AtualizaJogadorCommand implements ICommand {
  constructor(
    public readonly jogadorDto: JogadorDto,
  ) { }
}
