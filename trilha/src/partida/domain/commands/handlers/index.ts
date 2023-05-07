import { EfetuaJogadaHandler } from "./efetua-jogada.handler";
import { DeletaPartidaHandler } from "./deleta-partida.handler";
import { RegistraPartidaHandler } from "./registra-partida.handler";

export const CommandHandlers = [
  RegistraPartidaHandler,
  EfetuaJogadaHandler,
  DeletaPartidaHandler,
]
