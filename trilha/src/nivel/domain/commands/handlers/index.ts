import { AtualizaNivelHandler } from "./atualiza-nivel.handler";
import { DeletaNivelHandler } from "./deleta-nivel.handler";
import { RegistraNivelHandler } from "./registra-nivel.handler";

export const CommandHandlers = [
  RegistraNivelHandler,
  AtualizaNivelHandler,
  DeletaNivelHandler
]
