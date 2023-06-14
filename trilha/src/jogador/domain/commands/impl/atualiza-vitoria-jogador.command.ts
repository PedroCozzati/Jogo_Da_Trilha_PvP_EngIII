import { ICommand } from '@nestjs/cqrs';
import { AtualizaVitoriaJogadorDto } from 'src/jogador/application/dto/jogador.dto';

export class AtualizaVitoriaJogadorCommand implements ICommand {
  constructor(
    public readonly atualizaVitoriaJogador: AtualizaVitoriaJogadorDto,

  ) { }
}
