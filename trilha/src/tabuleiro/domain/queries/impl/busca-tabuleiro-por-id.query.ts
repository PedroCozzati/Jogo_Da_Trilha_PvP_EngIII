import { IQuery } from '@nestjs/cqrs';


export class BuscaTabuleiroPorIdQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) { }
}
