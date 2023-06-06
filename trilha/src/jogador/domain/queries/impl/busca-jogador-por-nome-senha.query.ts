import { IQuery } from '@nestjs/cqrs';


export class BuscaJogadorPorNomeESenhaQuery implements IQuery {
    constructor(
        public readonly nome: string,
        public readonly senha: string
    ) { }
}
