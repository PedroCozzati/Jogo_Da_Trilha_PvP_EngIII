import { NivelAtualizadaHandler } from "./nivel-atualizada.handler";
import { NivelDeletadoPorPecaHandler } from "./nivel-deletado-por-peca.handler";
import { NivelDeletadoPorTabuleiroHandler } from "./nivel-deletado-por-tabuleiro.handler";
import { NivelDeletadoHandler } from "./nivel-deletado.handler";
import { NivelRegistradoHandler } from "./nivel-registrado.handler";

export const EventHandlers = [
  NivelRegistradoHandler,
  NivelAtualizadaHandler,
  NivelDeletadoHandler,
  NivelDeletadoPorPecaHandler,
  NivelDeletadoPorTabuleiroHandler
];
