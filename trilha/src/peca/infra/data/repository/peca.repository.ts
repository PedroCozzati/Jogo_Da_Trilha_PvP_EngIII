import { Injectable } from '@nestjs/common';
import { Peca } from 'src/peca/domain/models/peca.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Types } from 'mongoose';
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
  public async deletaPeca(peca: Peca) {
    try {
      this._logger.log("executing repository method")

      const pecaDeletada = new Peca(await this.repositoryBase.deleteOne({ "_id": peca._id }, peca))

      await pecaDeletada.deletaPeca()

      return pecaDeletada
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async buscaPecaPorId(id: string) {
    try {
      this._logger.log("executing repository method")

      const peca = await this.repositoryBase.findOneById(new Types.ObjectId(id))

      if (peca)
        return new Peca(peca)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }


  @Span()
  public async buscaPecas() {
    try {
      this._logger.log("executing repository method")

      const pecas = await this.repositoryBase.find({})
      return pecas

    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

}
