import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { TransacaoDto } from '../../application/dto/transacao.dto';
import { TransacaoService } from '../../application/services/transacao.service';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class TransacaoJobHandler {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly transacaoService: TransacaoService,
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