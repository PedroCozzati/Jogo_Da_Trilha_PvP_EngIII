import { IsString, IsNotEmpty } from 'class-validator';

export class PartidaDto {
    @IsString()
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    readonly jogador1_id: string

    @IsString()
    @IsNotEmpty()
    readonly jogador2_id: string

    @IsString()
    @IsNotEmpty()
    readonly nivel_id: string

    @IsString()
    readonly versaoPartida: Array<any>;

    @IsString()
    readonly resultado: string

}