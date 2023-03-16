import { Injectable } from '@nestjs/common';
import { Jogador } from 'src/jogador/domain/models/jogador.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Span } from 'nestjs-otel';

@Injectable()
export class JogadorRepository {
  constructor(
    private readonly repositoryBase: MongooseBaseRepository<Jogador>,
    private readonly _logger: Logger,
  ) { }

  @Span()
  public async insereJogador(jogador: Jogador) {
    try {
      this._logger.log("executing repository method")

      const jogadorInserido = new Jogador(await this.repositoryBase.insertOne(jogador))

      await jogadorInserido.registraJogador()

      return jogadorInserido
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async consultaJogadorAtual() {
    try {
      this._logger.log("executing repository method")

      const jogadorAtual = await this.repositoryBase.findOne({}, { timeStamp: "desc" })

      if (jogadorAtual)
        return new Jogador(jogadorAtual)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
}
