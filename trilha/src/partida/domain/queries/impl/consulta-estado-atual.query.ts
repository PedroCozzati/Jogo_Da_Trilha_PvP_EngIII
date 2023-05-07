import { IQuery } from '@nestjs/cqrs';
import { PartidaDto } from 'src/partida/application/dto/partida.dto';


export class ConsultaEstadoAtualQuery implements IQuery {
    constructor(
        public readonly partidaDto: PartidaDto,
    ) { }
}
