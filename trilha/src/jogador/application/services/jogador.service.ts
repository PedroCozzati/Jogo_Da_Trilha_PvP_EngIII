import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraJogadorCommand } from 'src/jogador/domain/commands/impl/registra-jogador.command';
import { JogadorDto } from '../dto/jogador.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaJogadorCommand } from '../../domain/commands/impl/atualiza-jogador.command';
import { DeletaJogadorCommand } from 'src/jogador/domain/commands/impl/deleta-jogador.command';
import { BuscaJogadorsQuery } from 'src/jogador/domain/queries/impl/busca-jogadors.query';
import { BuscaJogadorPorIdQuery } from 'src/jogador/domain/queries/impl/busca-jogador-por-id.query';

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
  async deletaJogador(id: string) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new DeletaJogadorCommand(id));
  }
}
