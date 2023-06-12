import { IsString, IsNotEmpty, IsArray } from 'class-validator';

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

    @IsArray()
    readonly versaoPartida: Array<any>;

    @IsArray()
    readonly moinhosAtivos: Array<any>;

    @IsString()
    readonly resultado: string
    
    @IsString()
    readonly aguardandoResolucaoMoinho: string
}

export class RegistraPartidaDto {
    @IsString()
    @IsNotEmpty()
    readonly jogador_id: string

    @IsString()
    @IsNotEmpty()
    readonly nivel_id: string
}

export class MoinhoEfetuadoDto {
    @IsString()
    @IsNotEmpty()
    readonly jogador_id: string

}

export class PartidaFinalizadaDto {
    @IsString()
    @IsNotEmpty()
    readonly jogador_vencedor_id: string

}

export class JogadorPartidaDto {
    @IsString()
    @IsNotEmpty()
    readonly id_jogador: string
}


