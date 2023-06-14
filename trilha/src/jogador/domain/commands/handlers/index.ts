import { AtualizaJogadorHandler } from "./atualiza-jogador.handler";
import { AtualizaSaldoJogadorHandler } from "./atualiza-saldo-jogador.handler";
import { AtualizaVitoriaJogadorHandler } from "./atualiza-vitoria-jogador.handler";
import { DeletaJogadorHandler } from "./deleta-jogador.handler";
import { RegistraJogadorHandler } from "./registra-jogador.handler";

export const CommandHandlers = [
  RegistraJogadorHandler,
  AtualizaJogadorHandler,
  DeletaJogadorHandler,
  AtualizaSaldoJogadorHandler,
  AtualizaVitoriaJogadorHandler
]

