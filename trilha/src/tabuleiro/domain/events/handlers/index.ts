import { TabuleiroDeletadoEvent } from "../impl/tabuleiro-deletado.event";
import { TabuleiroAtualizadaHandler } from "./tabuleiro-atualizada.handler";
import { TabuleiroRegistradoHandler } from "./tabuleiro-registrado.handler";

export const EventHandlers = [
  TabuleiroRegistradoHandler,
  TabuleiroAtualizadaHandler,
  TabuleiroDeletadoEvent,
];
