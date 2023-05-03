import { IsString } from 'class-validator';

export class TransacaoDto {
    @IsString()
    readonly _id: string

    readonly jogador: string

    readonly valor: number
}