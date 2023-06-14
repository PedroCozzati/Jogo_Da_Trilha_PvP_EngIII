import { Injectable, NotImplementedException } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { TabuleiroDto } from '../../application/dto/tabuleiro.dto';
import { TabuleiroService } from '../../application/services/tabuleiro.service';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class TabuleiroJobHandler {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly tabuleiroService: TabuleiroService,
    private readonly _logger: Logger,
  ) { }

  // @Span()
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async QUALQUER_NOME() {
  //   try {
  //     //throw new NotImplementedException()
  //     await this.tabuleiroService.buscaTabuleiros()
  //   } catch (exception) {
  //     this._logger.error("error on job", { exception })
  //   }
  // }
}