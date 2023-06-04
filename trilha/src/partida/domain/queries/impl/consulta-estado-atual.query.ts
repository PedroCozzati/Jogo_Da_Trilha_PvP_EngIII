import { IQuery } from '@nestjs/cqrs';
import { JogadorPartidaDto } from 'src/partida/application/dto/partida.dto';


export class ConsultaEstadoAtualQuery implements IQuery {
    constructor(
        public readonly jogadorDto: JogadorPartidaDto,
    ) { }


}
