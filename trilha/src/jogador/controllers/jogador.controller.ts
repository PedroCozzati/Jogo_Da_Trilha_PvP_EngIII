import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { JogadorDto } from '../application/dto/jogador.dto';
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
  @Post()
  async post(@Body() params: JogadorDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting morgana request")

      return response.status(HttpStatus.OK).json({
        data: await this.jogadorService.registraJogador(params),
        tipoApresentacao: "objeto",
      })
    } catch (exception) {
      this._logger.error("error on morgana request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Get()
  async get(@Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting morgana request")

      return response.status(HttpStatus.OK).json({
        data: await this.jogadorService.consultaJogadorAtual(),
        tipoApresentacao: "objeto",
      })
    } catch (exception) {
      this._logger.error("error on morgana request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
}