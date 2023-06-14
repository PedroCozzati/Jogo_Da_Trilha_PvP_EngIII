import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NivelDto {
    @IsString()
    readonly _id: string

    @IsString()
    readonly tabuleiro_id: string

    @IsString()
    readonly peca_id: string

    @IsString()
    readonly nome: string

    @IsNumber()
    readonly valorDeAposta: number
}