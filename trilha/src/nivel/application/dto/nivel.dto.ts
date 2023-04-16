import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NivelDto {
    @IsString()
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    readonly tabuleiro_id: string

    @IsString()
    @IsNotEmpty()
    readonly peca_id: string

    @IsString()
    @IsNotEmpty()
    readonly nome: string

    @IsNumber()
    @IsNotEmpty()
    readonly valorDeAposta: number

}