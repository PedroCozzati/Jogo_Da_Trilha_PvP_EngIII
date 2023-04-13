import { BuscaTabuleiroPorIdHandler } from "src/tabuleiro/domain/queries/handlers/busca-tabuleiro-por-id.handler";
import { BuscaTabuleirosHandler } from "src/tabuleiro/domain/queries/handlers/busca-tabuleiro.handler";

export const QueryHandlers = [
    BuscaTabuleiroPorIdHandler,
    BuscaTabuleirosHandler
];