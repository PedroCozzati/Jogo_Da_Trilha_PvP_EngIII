import { IEvent } from '@nestjs/cqrs';
import { PartidaFinalizadaDto } from 'src/partida/application/dto/partida.dto';

export class PartidaFinalizadaEvent implements IEvent {
  constructor(
    public readonly partidaFinalizadaDto: PartidaFinalizadaDto
  ) { }
}
