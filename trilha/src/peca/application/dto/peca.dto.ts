import { IsString } from 'class-validator';

export class PecaDto {
    @IsString()
    readonly _id: string

    @IsString()
    readonly nome: string

    @IsString()
    readonly corLadoA: string

    @IsString()
    readonly corLadoB: string

}