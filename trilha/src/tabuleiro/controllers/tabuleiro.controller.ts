import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { TabuleiroDto } from '../application/dto/tabuleiro.dto';
import { TabuleiroService } from '../application/services/tabuleiro.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("tabuleiro")
export class TabuleiroController {
  constructor(
    private readonly tabuleiroService: TabuleiroService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Get(":id")
  async getById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.tabuleiroService.buscaTabuleiroPorId(id))
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

      return response.status(HttpStatus.OK).json(await this.tabuleiroService.buscaTabuleiros())
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Post()
  async post(@Body() params: TabuleiroDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.tabuleiroService.registraTabuleiro(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put()
  async put(@Body() params: TabuleiroDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.tabuleiroService.atualizaTabuleiro(params))
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

      return response.status(HttpStatus.OK).json(await this.tabuleiroService.deletaTabuleiro(id))
    } catch (exception) {
      this._logger.error(exception.message)
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }
}