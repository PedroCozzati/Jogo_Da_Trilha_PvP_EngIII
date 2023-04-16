import { IQuery } from '@nestjs/cqrs';


export class BuscaPecaPorIdQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) { }
}
