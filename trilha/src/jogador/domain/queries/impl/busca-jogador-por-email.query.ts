import { IQuery } from '@nestjs/cqrs';


export class BuscaJogadorPorEmailQuery implements IQuery {
    constructor(
        public readonly email: string
    ) { }
}
