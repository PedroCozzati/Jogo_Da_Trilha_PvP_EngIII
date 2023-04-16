import { IEvent } from '@nestjs/cqrs';
import { NivelDto } from 'src/nivel/application/dto/nivel.dto';

export class NivelDeletadoEvent implements IEvent {
  constructor(
    public readonly nivelDto: NivelDto) { }
}
