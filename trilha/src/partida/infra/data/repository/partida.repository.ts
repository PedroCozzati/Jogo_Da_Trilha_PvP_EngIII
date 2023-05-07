import { Injectable } from '@nestjs/common';
import { Partida } from 'src/partida/domain/models/partida.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Types } from 'mongoose';
import { Span } from 'nestjs-otel';


@Injectable()
export class PartidaRepository {
  constructor(
    private readonly repositoryBase: MongooseBaseRepository<Partida>,
    private readonly _logger: Logger,
  ) { }

  @Span()
  public async inserePartida(partida: Partida) {
    try {
      this._logger.log("executing repository method")

      const partidaInserido = new Partida(await this.repositoryBase.insertOne(partida))

      await partidaInserido.registraPartida()

      return partidaInserido
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async efetuaJogada(partida: Partida) {
    try {
      this._logger.log("executing repository method")

      const jogadaEfetuada = new Partida(await this.repositoryBase.updateOne(partida))

      await jogadaEfetuada.efetuaJogada()

      return jogadaEfetuada
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async deletaPartida(partida: Partida) {
    try {
      this._logger.log("executing repository method")

      const partidaDeletada = new Partida(await this.repositoryBase.deleteOne({ "_id": partida._id }, partida))

      await partidaDeletada.deletaPartida()

      return partidaDeletada
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async buscaPartidaPorId(id: string) {
    try {
      this._logger.log("executing repository method")

      const partida = await this.repositoryBase.findOneById(new Types.ObjectId(id))

      if (partida)
        return new Partida(partida)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }


  @Span()
  public async buscaPartidas() {
    try {
      this._logger.log("executing repository method")

      const partidas = await this.repositoryBase.find({})
      return partidas

    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

}
