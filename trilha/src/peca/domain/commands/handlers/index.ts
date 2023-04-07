import { AtualizaPecaHandler } from "./atualiza-peca.handler";
import { DeletaPecaHandler } from "./deleta-peca.handler";
import { RegistraPecaHandler } from "./registra-peca.handler";

export const CommandHandlers = [
  RegistraPecaHandler,
  AtualizaPecaHandler,
  DeletaPecaHandler,
]
