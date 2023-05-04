import { BuscaJogadorPorIdHandler } from "src/jogador/domain/queries/handlers/busca-jogador-por-id.handler";
import { BuscaJogadorsHandler } from "src/jogador/domain/queries/handlers/busca-jogadors.handler";

export const QueryHandlers = [
    BuscaJogadorPorIdHandler,
    BuscaJogadorsHandler
];