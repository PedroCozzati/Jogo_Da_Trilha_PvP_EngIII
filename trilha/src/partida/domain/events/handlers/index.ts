import { JogadaEfetuadaHandler, } from "./jogada-efetuada.handler";
import { MoinhoEfetuadoHandler } from "./moinho-efetuado.handler";
import { PartidaRegistradaHandler } from "./partida-registrada.handler";

export const EventHandlers = [
  PartidaRegistradaHandler,
  JogadaEfetuadaHandler,
  MoinhoEfetuadoHandler
];
