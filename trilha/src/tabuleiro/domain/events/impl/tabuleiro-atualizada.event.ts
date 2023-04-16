import { IEvent } from '@nestjs/cqrs';
import { TabuleiroDto } from 'src/tabuleiro/application/dto/tabuleiro.dto';

export class TabuleiroAtualizadaEvent implements IEvent {
  constructor(
    public readonly tabuleiroDto: TabuleiroDto) { }
}
