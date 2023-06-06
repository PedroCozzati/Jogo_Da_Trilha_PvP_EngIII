import { BuscaJogadorPorIdHandler } from "src/jogador/domain/queries/handlers/busca-jogador-por-id.handler";
import { BuscaJogadorsHandler } from "src/jogador/domain/queries/handlers/busca-jogadors.handler";
import { BuscaJogadorPorNomeESenhaHandler } from "./busca-jogador-por-nome-senha.handler";

export const QueryHandlers = [
    BuscaJogadorPorIdHandler,
    BuscaJogadorPorNomeESenhaHandler,
    BuscaJogadorsHandler
];