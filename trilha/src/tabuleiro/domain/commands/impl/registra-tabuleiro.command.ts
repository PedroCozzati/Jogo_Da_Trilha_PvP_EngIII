import { ICommand } from '@nestjs/cqrs';
import { TabuleiroDto } from 'src/tabuleiro/application/dto/tabuleiro.dto';

export class RegistraTabuleiroCommand implements ICommand {
  constructor(
    public readonly tabuleiroDto: TabuleiroDto,
  ) { }
}
