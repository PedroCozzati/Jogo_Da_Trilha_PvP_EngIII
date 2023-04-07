import { NivelDeletadoEvent } from "../impl/nivel-deletado.event";
import { NivelAtualizadaHandler } from "./nivel-atualizada.handler";
import { NivelRegistradoHandler } from "./nivel-registrado.handler";

export const EventHandlers = [
  NivelRegistradoHandler,
  NivelAtualizadaHandler,
  NivelDeletadoEvent,
];
