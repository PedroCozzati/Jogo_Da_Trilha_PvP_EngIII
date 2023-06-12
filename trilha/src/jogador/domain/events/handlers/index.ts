import { JogadorDeletadoHandler } from "./jogador-deletado.handler";
import { JogadorAtualizadoEventHandler } from "./jogador-atualizado.handler";
import { JogadorRegistradoHandler } from "./jogador-registrado.handler";
import { SaldoJogadorAtualizadoEventHandler } from "./saldo-jogador-atualizado.handler";
import { VitoriaJogadorAtualizadaEventHandler } from "./vitoria-jogador-atualizada.handler";

export const EventHandlers = [
  JogadorRegistradoHandler,
  JogadorAtualizadoEventHandler,
  JogadorDeletadoHandler,
  SaldoJogadorAtualizadoEventHandler,
  VitoriaJogadorAtualizadaEventHandler
];
