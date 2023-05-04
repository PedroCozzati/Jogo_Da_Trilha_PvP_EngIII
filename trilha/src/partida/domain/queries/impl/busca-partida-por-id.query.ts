import { IQuery } from '@nestjs/cqrs';


export class BuscaPartidaPorIdQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) { }
}
