import { ICommand } from '@nestjs/cqrs';
import { NivelDto } from 'src/nivel/application/dto/nivel.dto';

export class AtualizaNivelCommand implements ICommand {
  constructor(
    public readonly nivelDto: NivelDto,
  ) { }
}
