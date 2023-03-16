import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { JogadorDto } from '../../application/dto/jogador.dto';
import { JogadorService } from '../../application/services/jogador.service';
import { Logger } from 'nestjs-pino';
import { Span } from 'nestjs-otel';

@Injectable()
export class JogadorJobHandler {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly jogadorService: JogadorService,
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