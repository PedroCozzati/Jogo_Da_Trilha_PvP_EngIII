import { IQuery } from '@nestjs/cqrs';


export class BuscaNivelPorIdQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) { }
}
