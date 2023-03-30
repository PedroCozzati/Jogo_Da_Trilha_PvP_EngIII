import { Injectable } from '@nestjs/common';
import { Peca } from 'src/peca/domain/models/peca.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Span } from 'nestjs-otel';

@Injectable()
export class PecaRepository {
  constructor(
    private readonly repositoryBase: MongooseBaseRepository<Peca>,
    private readonly _logger: Logger,
  ) { }

  @Span()
  public async inserePeca(peca: Peca) {
    try {
      this._logger.log("executing repository method")

      const pecaInserido = new Peca(await this.repositoryBase.insertOne(peca))

      await pecaInserido.registraPeca()

      return pecaInserido
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async atualizaPeca(peca: Peca) {
    try {
      this._logger.log("executing repository method")

      const pecaAtualizada = new Peca(await this.repositoryBase.updateOne(peca))

      await pecaAtualizada.atualizaPeca()

      return pecaAtualizada
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async consultaPecaAtual() {
    try {
      this._logger.log("executing repository method")

      const pecaAtual = await this.repositoryBase.findOne({}, { timeStamp: "desc" })

      if (pecaAtual)
        return new Peca(pecaAtual)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
}
