import { JogadaEfetuadaHandler, } from "./jogada-efetuada.handler";
import { MoinhoEfetuadoHandler } from "./moinho-efetuado.handler";
import { PartidaFinalizadaHandler } from "./partida-finalizada.handler";
import { PartidaRegistradaHandler } from "./partida-registrada.handler";

export const EventHandlers = [
  PartidaRegistradaHandler,
  JogadaEfetuadaHandler,
  MoinhoEfetuadoHandler,
  PartidaFinalizadaHandler,
];
