import { Injectable } from '@nestjs/common';
import { Transacao } from 'src/transacao/domain/models/transacao.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Span } from 'nestjs-otel';

@Injectable()
export class TransacaoRepository {
  constructor(
    private readonly repositoryBase: MongooseBaseRepository<Transacao>,
    private readonly _logger: Logger,
  ) { }

  @Span()
  public async insereTransacao(transacao: Transacao) {
    try {
      this._logger.log("executing repository method")

      const transacaoInserido = new Transacao(await this.repositoryBase.insertOne(transacao))

      await transacaoInserido.registraTransacao()

      return transacaoInserido
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async consultaTransacaoAtual() {
    try {
      this._logger.log("executing repository method")

      const transacaoAtual = await this.repositoryBase.findOne({}, { timeStamp: "desc" })

      if (transacaoAtual)
        return new Transacao(transacaoAtual)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
}
