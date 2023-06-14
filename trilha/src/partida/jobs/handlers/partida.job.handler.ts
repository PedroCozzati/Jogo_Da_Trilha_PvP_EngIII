import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { PartidaDto } from '../../application/dto/partida.dto';
import { PartidaService } from '../../application/services/partida.service';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class PartidaJobHandler {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly partidaService: PartidaService,
    private readonly _logger: Logger,
  ) { }

  // @Span()
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async QUALQUER_NOME() {
  //   try {

  //   } catch (exception) {
  //     this._logger.error("error on job", { exception })
  //   }
  // }
}