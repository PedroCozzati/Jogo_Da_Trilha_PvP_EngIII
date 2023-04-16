import { ICommand } from '@nestjs/cqrs';
import { PecaDto } from 'src/peca/application/dto/peca.dto';

export class DeletaPecaCommand implements ICommand {
  constructor(
    public readonly pecaDto: PecaDto,
  ) { }
}
