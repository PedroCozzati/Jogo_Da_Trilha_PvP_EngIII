import { IsString } from 'class-validator';

export class TabuleiroDto {
    @IsString()
    readonly _id: string

    @IsString()
    readonly nome: string

    @IsString()
    readonly cor: string

}