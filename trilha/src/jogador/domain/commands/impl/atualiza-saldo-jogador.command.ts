import { ICommand } from '@nestjs/cqrs';
import { AtualizaSaldoJogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class AtualizaSaldoJogadorCommand implements ICommand {
  constructor(
    public readonly atualizaSaldoJogador: AtualizaSaldoJogadorDto,

  ) { }
}
