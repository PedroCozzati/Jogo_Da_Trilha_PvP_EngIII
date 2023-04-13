import { Injectable } from '@nestjs/common';
import { Nivel } from 'src/nivel/domain/models/nivel.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Types } from 'mongoose';
import { Span } from 'nestjs-otel';

@Injectable()
export class NivelRepository {
  constructor(
    private readonly repositoryBase: MongooseBaseRepository<Nivel>,
    private readonly _logger: Logger,
  ) { }

  @Span()
  public async insereNivel(nivel: Nivel) {
    try {
      this._logger.log("executing repository method")

      const nivelInserido = new Nivel(await this.repositoryBase.insertOne(nivel))

      await nivelInserido.registraNivel()

      return nivelInserido
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
  @Span()
  public async deletaNivel(nivel: Nivel) {
    try {
      this._logger.log("executing repository method")

      const nivelDeletado = new Nivel(await this.repositoryBase.deleteOne({ "_id": nivel._id }, nivel))

      await nivelDeletado.deletaNivel()

      return nivelDeletado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async deletaNivelPorPeca(nivel: Nivel) {
    try {
      this._logger.log("executing repository method")

      const nivelDeletado = new Nivel(await this.repositoryBase.deleteMany({ "peca_id": nivel.peca_id }, nivel))

      await nivelDeletado.deletaNivel()

      return nivelDeletado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async deletaNivelPorTabuleiro(nivel: Nivel) {
    try {
      this._logger.log("executing repository method")

      const nivelDeletado = new Nivel(await this.repositoryBase.deleteMany({ "tabuleiro_id": nivel.tabuleiro_id }, nivel))

      await nivelDeletado.deletaNivel()

      return nivelDeletado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }


  @Span()
  public async atualizaNivel(nivel: Nivel) {
    try {
      this._logger.log("executing repository method")

      const nivelAtualizada = new Nivel(await this.repositoryBase.updateOne(nivel))

      await nivelAtualizada.atualizaNivel()

      return nivelAtualizada
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async buscaNivelPorId(id: string) {
    try {
      this._logger.log("executing repository method")

      const nivel = await this.repositoryBase.findOneById(new Types.ObjectId(id))

      if (nivel)
        return new Nivel(nivel)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }


  @Span()
  public async buscaNiveis() {
    try {
      this._logger.log("executing repository method")

      const niveis = await this.repositoryBase.find({})
      return niveis

    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
}
