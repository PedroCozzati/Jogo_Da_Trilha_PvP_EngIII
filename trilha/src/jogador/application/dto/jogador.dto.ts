import { IsString, IsNumber, IsDate } from 'class-validator';

export class JogadorDto {
    @IsString()
    readonly _id: string

    @IsString()
    readonly nome: string

    @IsString()
    readonly email: string

    @IsString()
    readonly senha: string

    @IsNumber()
    readonly saldo: number

    @IsNumber()
    readonly vitorias: number

}

export class AtualizaSaldoJogadorDto {
    @IsString()
    readonly _id: string

    @IsNumber()
    readonly saldo: number

}


export class AtualizaVitoriaJogadorDto {
    @IsString()
    readonly _id: string

    @IsNumber()
    readonly vitorias: number

}