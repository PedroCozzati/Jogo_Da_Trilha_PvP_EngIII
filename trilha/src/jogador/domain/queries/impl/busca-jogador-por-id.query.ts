import { IQuery } from '@nestjs/cqrs';


export class BuscaJogadorPorIdQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) { }
}
