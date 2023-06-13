import { Injectable } from '@nestjs/common';
import { Jogador } from 'src/jogador/domain/models/jogador.model';
import { Logger } from 'nestjs-pino';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Span } from 'nestjs-otel';
import { Types } from 'mongoose';
import { AtualizaSaldoJogadorDto } from '../../../application/dto/jogador.dto';

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
  public async deletaJogador(jogador: Jogador) {
    try {
      this._logger.log("executing repository method")

      const jogadorDeletado = new Jogador(await this.repositoryBase.deleteOne({ "_id": jogador._id }, jogador))

      await jogadorDeletado.deletaJogador()

      return jogadorDeletado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async atualizaJogador(jogador: Jogador) {
    try {
      this._logger.log("executing repository method")

      const jogadorAtualizado = new Jogador(await this.repositoryBase.updateOne(jogador))

      await jogadorAtualizado.atualizaJogador()

      return jogadorAtualizado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async atualizaSaldoJogador(jogador: Jogador, atualizaSaldoJogadorDto: AtualizaSaldoJogadorDto) {
    try {
      this._logger.log("executing repository method")

      const jogadorAtualizado = new Jogador(await this.repositoryBase.updateOne(jogador))

      await jogadorAtualizado.atualizaSaldoJogador(atualizaSaldoJogadorDto)

      return jogadorAtualizado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async atualizaVitoriaJogador(jogador: Jogador) {
    try {
      this._logger.log("executing repository method")

      const jogadorAtualizado = new Jogador(await this.repositoryBase.updateOne(jogador))

      await jogadorAtualizado.atualizaVitoriaJogador()

      return jogadorAtualizado
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  // @Span()
  // public async atualizaSaldoJogador(id: String, saldo: number) {
  //   try {
  //     this._logger.log("executing repository method")

  //     const jogadorAtualizada = new Jogador(await this.repositoryBase.updateOne(jogador))

  //     await jogadorAtualizada.atualizaJogador()

  //     return jogadorAtualizada
  //   } catch (exception) {
  //     this._logger.error("error on repository method")
  //     throw exception
  //   }
  // }

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

  @Span()
  public async buscaJogadorPorId(id: string) {
    try {
      this._logger.log("executing repository method")

      const jogador = await this.repositoryBase.findOneById(new Types.ObjectId(id))

      if (jogador)
        return new Jogador(jogador)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async buscaJogadorPorNomeESenha(nome: string, senha: string) {
    try {
      this._logger.log("executing repository method")

      const jogador = await this.repositoryBase.findOne({ $and: [{ nome: nome }, { senha: senha }] })

      if (jogador)
        return new Jogador(jogador)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }

  @Span()
  public async buscaJogadorPorEmail(email: string) {
    try {
      this._logger.log("executing repository method")

      const jogador = await this.repositoryBase.findOne({ email: email })

      if (jogador)
        return new Jogador(jogador)
    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }


  @Span()
  public async buscaJogadors() {
    try {
      this._logger.log("executing repository method")

      const jogadors = await this.repositoryBase.find({})
      return jogadors

    } catch (exception) {
      this._logger.error("error on repository method")
      throw exception
    }
  }
}
