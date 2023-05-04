import { JogadorDeletadoEvent } from "../impl/jogador-deletado.event";
import { JogadorAtualizadaHandler } from "./jogador-atualizada.handler";
import { JogadorRegistradoHandler } from "./jogador-registrado.handler";

export const EventHandlers = [
  JogadorRegistradoHandler,
  JogadorAtualizadaHandler,
  JogadorDeletadoEvent,
];
