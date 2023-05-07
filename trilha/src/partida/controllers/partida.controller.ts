import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { PartidaDto } from '../application/dto/partida.dto';
import { PartidaService } from '../application/services/partida.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("partida")
export class PartidaController {
  constructor(
    private readonly partidaService: PartidaService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Get(":id")
  async getById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.partidaService.buscaPartidaPorId(id))
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

      return response.status(HttpStatus.OK).json(await this.partidaService.buscaPartidas())
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Post()
  async post(@Body() params: PartidaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.partidaService.registraPartida(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put(":_id")
  async put(@Param() queryParams: any, @Body() params: PartidaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.partidaService.efetuaJogada({ ...params, ...queryParams }))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete()
  async delete(@Body() params: PartidaDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.partidaService.deletaPartida(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }


}