import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { TransacaoDto } from '../application/dto/transacao.dto';
import { TransacaoService } from '../application/services/transacao.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("transacao")
export class TransacaoController {
  constructor(
    private readonly transacaoService: TransacaoService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Post()
  async post(@Body() params: TransacaoDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.transacaoService.registraTransacao(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
}