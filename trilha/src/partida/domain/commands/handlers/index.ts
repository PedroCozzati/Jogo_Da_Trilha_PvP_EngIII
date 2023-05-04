import { AtualizaPartidaHandler } from "./atualiza-partida.handler";
import { DeletaPartidaHandler } from "./deleta-partida.handler";
import { RegistraPartidaHandler } from "./registra-partida.handler";

export const CommandHandlers = [
  RegistraPartidaHandler,
  AtualizaPartidaHandler,
  DeletaPartidaHandler,
]
