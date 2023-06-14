import { ICommand } from '@nestjs/cqrs';
import { JogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class RegistraJogadorCommand implements ICommand {
  constructor(
    public readonly jogadorDto: JogadorDto,
  ) { }
}
