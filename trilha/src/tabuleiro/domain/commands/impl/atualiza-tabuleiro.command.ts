import { ICommand } from '@nestjs/cqrs';
import { TabuleiroDto } from 'src/tabuleiro/application/dto/tabuleiro.dto';

export class AtualizaTabuleiroCommand implements ICommand {
  constructor(
    public readonly tabuleiroDto: TabuleiroDto,
  ) { }
}
