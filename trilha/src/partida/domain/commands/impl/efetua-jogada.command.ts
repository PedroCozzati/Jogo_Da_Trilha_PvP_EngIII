import { ICommand } from '@nestjs/cqrs';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';

export class EfetuaJogadaCommand implements ICommand {
  constructor(
    public readonly partidaDto: PartidaDto,
  ) { }
}
