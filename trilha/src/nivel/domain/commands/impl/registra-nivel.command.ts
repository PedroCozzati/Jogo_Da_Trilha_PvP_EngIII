import { ICommand } from '@nestjs/cqrs';
import { NivelDto } from 'src/nivel/application/dto/nivel.dto';

export class RegistraNivelCommand implements ICommand {
  constructor(
    public readonly nivelDto: NivelDto,
  ) { }
}
