import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistraPecaCommand } from 'src/peca/domain/commands/impl/registra-peca.command';
import { PecaDto } from '../dto/peca.dto';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';
import { AtualizaPecaCommand } from '../../domain/commands/impl/atualiza-peca.command';
import { DeletaPecaCommand } from 'src/peca/domain/commands/impl/deleta-peca.command';
import { BuscaPecaPorIdQuery } from 'src/peca/domain/queries/impl/busca-peca-por-id.query';
import { BuscaPecasQuery } from 'src/peca/domain/queries/impl/busca-pecas.query';

@Injectable()
export class PecaService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly _logger: Logger,
  ) { }

  @Span()
  async buscaPecaPorId(id: string) {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaPecaPorIdQuery(id));
  }

  @Span()
  async buscaPecas() {
    this._logger.log('starting service execution');

    return await this.queryBus.execute(new BuscaPecasQuery());
  }


  @Span()
  async registraPeca(peca: PecaDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new RegistraPecaCommand(peca));
  }

  @Span()
  async atualizaPeca(peca: PecaDto) {
    this._logger.log('starting service execution');

    return await this.commandBus.execute(new AtualizaPecaCommand(peca));
  }

  @Span()
  async deletaPeca(peca: PecaDto) {
    this._logger.log("starting service execution")

    return await this.commandBus.execute(
      new DeletaPecaCommand(peca),
    );
  }

}
