import { IsString } from 'class-validator';

export class JogadorDto {
    @IsString()
    readonly _id: string

    readonly nome: string
}