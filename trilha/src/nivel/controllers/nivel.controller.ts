import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { NivelDto } from '../application/dto/nivel.dto';
import { NivelService } from '../application/services/nivel.service';
import { Response, Request } from 'express'
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Controller("nivel")
export class NivelController {
  constructor(
    private readonly nivelService: NivelService,
    private readonly _logger: Logger,
  ) { }

  @Span()
  @Post()
  async post(@Body() params: NivelDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.registraNivel(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Put()
  async put(@Body() params: NivelDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.atualizaNivel(params))
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete()
  async delete(@Body() params: NivelDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.deletaNivel(params))
    } catch (exception) {
      this._logger.error(exception.message)
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete("por-peca")
  async deletePorPeca(@Body() params: NivelDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.deletaNivelPorPeca(params))
    } catch (exception) {
      this._logger.error(exception.message)
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Delete("por-tabuleiro")
  async deletePorTabuleiro(@Body() params: NivelDto, @Res() response: Response, @Req() request: Request): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.deletaNivelPorTabuleiro(params))
    } catch (exception) {
      this._logger.error(exception.message)
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

  @Span()
  @Get(":id")
  async getById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    try {
      this._logger.log("starting request")

      return response.status(HttpStatus.OK).json(await this.nivelService.buscaNivelPorId(id))
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

      return response.status(HttpStatus.OK).json(await this.nivelService.buscaNiveis())
    } catch (exception) {
      this._logger.error("error on request", { ...exception })
      return response.status(HttpStatus.BAD_REQUEST).json(exception)
    }
  }

}