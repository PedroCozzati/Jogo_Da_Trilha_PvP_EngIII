import { IEvent } from '@nestjs/cqrs';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';

export class PartidaAtualizadaEvent implements IEvent {
  constructor(
    public readonly partidaDto: PartidaDto) { }
}
