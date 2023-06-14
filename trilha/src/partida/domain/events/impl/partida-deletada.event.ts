import { IEvent } from '@nestjs/cqrs';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';

export class PartidaDeletadaEvent implements IEvent {
  constructor(
    public readonly partidaDto: PartidaDto) { }
}
