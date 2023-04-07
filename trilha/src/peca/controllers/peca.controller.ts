import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { PecaDto } from '../application/dto/peca.dto';
import { PecaService } from '../application/services/peca.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("peca")
export class PecaController {
  constructor(
    private readonly pecaService: PecaService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Post()
  async post(@Body() params: PecaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.pecaService.registraPeca(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put()
  async put(@Body() params: PecaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.pecaService.atualizaPeca(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete()
  async delete(@Body() params: PecaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.pecaService.deletaPeca(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
}