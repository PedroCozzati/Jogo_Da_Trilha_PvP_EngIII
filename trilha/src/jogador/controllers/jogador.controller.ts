import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Query } from '@nestjs/common';
import { AtualizaSaldoJogadorDto, JogadorDto } from '../application/dto/jogador.dto';
import { JogadorService } from '../application/services/jogador.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("jogador")
export class JogadorController {
  constructor(
    private readonly jogadorService: JogadorService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Get("/login")
  async getByNomeESenha(@Query('nome') nome: string, @Query('senha') senha: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.buscaJogadorPorNomeESenha(nome, senha))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Get("/recuperacao")
  async getByEmail(@Query('email') email: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.buscaJogadorPorEmail(email))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Get(":id")
  async getById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.buscaJogadorPorId(id))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Get()
  async get(@Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.buscaJogadors())
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Post()
  async post(@Body() params: JogadorDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.registraJogador(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put(":_id")
  async put(
    @Param() queryParams: any,
    @Body() params: JogadorDto,
    @Res() response: Response,
    @Req() request: Request
  ): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.atualizaJogador({ ...params, ...queryParams }))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put("atualiza-saldo/:_id")
  async atualizaSaldo(
    @Param() queryParams: any,
    @Body() params: AtualizaSaldoJogadorDto,
    @Res() response: Response,
    @Req() request: Request
  ): Promise<any> {
    try {
      this._logger.log("starting request")

      // const { saldo } = queryParams;
      // const saldoAtualizado = Number(saldo) + Number(saldo_novo);

      return response.status(HttpStatus.OK).json(await this.jogadorService.atualizaSaldoJogador({ ...params, ...queryParams }))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete(":id")
  async delete(@Param('id') id: string, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.jogadorService.deletaJogador(id))
    } catch (exception) {
      this._logger.error(exception.message)
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
}