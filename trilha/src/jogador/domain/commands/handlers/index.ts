import { AtualizaJogadorHandler } from "./atualiza-jogador.handler";
import { DeletaJogadorHandler } from "./deleta-jogador.handler";
import { RegistraJogadorHandler } from "./registra-jogador.handler";

export const CommandHandlers = [
  RegistraJogadorHandler,
  AtualizaJogadorHandler,
  DeletaJogadorHandler
]
