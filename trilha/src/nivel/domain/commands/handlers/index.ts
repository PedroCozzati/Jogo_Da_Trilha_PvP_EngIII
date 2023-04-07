import { AtualizaNivelHandler } from "./atualiza-nivel.handler";
import { DeletaNivelPorPecaHandler } from "./deleta-nivel-por-peca.handler";
import { DeletaNivelPorTabuleiroHandler } from "./deleta-nivel-por-tabuleiro.handler";
import { DeletaNivelHandler } from "./deleta-nivel.handler";
import { RegistraNivelHandler } from "./registra-nivel.handler";

export const CommandHandlers = [
  RegistraNivelHandler,
  AtualizaNivelHandler,
  DeletaNivelHandler,
  DeletaNivelPorPecaHandler,
  DeletaNivelPorTabuleiroHandler
]
