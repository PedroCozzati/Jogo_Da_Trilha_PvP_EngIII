import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraJogadorCommand } from 'src/jogador/domain/commands/impl/registra-jogador.command';
import { AtualizaSaldoJogadorDto, JogadorDto } from '../dto/jogador.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaJogadorCommand } from '../../domain/commands/impl/atualiza-jogador.command';
import { DeletaJogadorCommand } from 'src/jogador/domain/commands/impl/deleta-jogador.command';
import { BuscaJogadorsQuery } from 'src/jogador/domain/queries/impl/busca-jogadors.query';
import { BuscaJogadorPorIdQuery } from 'src/jogador/domain/queries/impl/busca-jogador-por-id.query';
import { AtualizaSaldoJogadorCommand } from 'src/jogador/domain/commands/impl/atualiza-saldo-jogador.command';
import { BuscaJogadorPorNomeESenhaQuery } from 'src/jogador/domain/queries/impl/busca-jogador-por-nome-senha.query';
import { BuscaJogadorPorEmailQuery } from 'src/jogador/domain/queries/impl/busca-jogador-por-email.query';

@Injectable()
export class JogadorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async buscaJogadorPorId(id: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaJogadorPorIdQuery(id));
  }

  @Span()
  async buscaJogadorPorNomeESenha(nome: string, senha: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaJogadorPorNomeESenhaQuery(nome, senha));
  }

  @Span()
  async buscaJogadorPorEmail(email: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaJogadorPorEmailQuery(email));
  }

  @Span()
  async buscaJogadors() {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaJogadorsQuery());
  }

  @Span()
  async registraJogador(jogador: JogadorDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new RegistraJogadorCommand(jogador));
  }

  @Span()
  async atualizaJogador(jogador: JogadorDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaJogadorCommand(jogador));
  }
  @Span()

  async atualizaSaldoJogador(atualizaSaldoJogador: AtualizaSaldoJogadorDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaSaldoJogadorCommand(atualizaSaldoJogador));
  }

  @Span()
  async deletaJogador(id: string) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaJogadorCommand(id));
  }
}
