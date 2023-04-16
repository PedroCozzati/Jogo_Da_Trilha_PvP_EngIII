import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { PecaDto } from '../../application/dto/peca.dto';
import { PecaService } from '../../application/services/peca.service';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class PecaJobHandler {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly pecaService: PecaService,
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