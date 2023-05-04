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

    @IsDate()
    readonly dataNasc: Date

    @IsNumber()
    readonly vitorias: number

}