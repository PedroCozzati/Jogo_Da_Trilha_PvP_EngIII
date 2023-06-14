import { AtualizaTabuleiroHandler } from "./atualiza-tabuleiro.handler";
import { DeletaTabuleiroHandler } from "./deleta-tabuleiro.handler";
import { RegistraTabuleiroHandler } from "./registra-tabuleiro.handler";

export const CommandHandlers = [
  RegistraTabuleiroHandler,
  AtualizaTabuleiroHandler,
  DeletaTabuleiroHandler
]
