import { DeletaTabuleiroCommand } from "../impl/deleta-tabuleiro.command";
import { AtualizaTabuleiroHandler } from "./atualiza-tabuleiro.handler";
import { RegistraTabuleiroHandler } from "./registra-tabuleiro.handler";

export const CommandHandlers = [
  RegistraTabuleiroHandler,
  AtualizaTabuleiroHandler,
  DeletaTabuleiroCommand
]
