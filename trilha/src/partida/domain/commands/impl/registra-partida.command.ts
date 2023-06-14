import { ICommand } from '@nestjs/cqrs';
import { RegistraPartidaDto } from 'src/partida/application/dto/partida.dto';

export class RegistraPartidaCommand implements ICommand {
  constructor(
    public readonly registraPartidaDto: RegistraPartidaDto,
  ) { }
}
