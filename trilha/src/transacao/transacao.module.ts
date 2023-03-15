import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { TransacaoSagas } from './application/sagas/transacao.sagas';
import { TransacaoController } from './controllers/transacao.controller';
import { TransacaoRepository } from './infra/data/repository/transacao.repository';
import { TransacaoService } from './application/services/transacao.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TransacaoSchema } from './domain/models/transacao.model';
import { TransacaoJobHandler } from './jobs/handlers/transacao.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Transacao', schema: TransacaoSchema }
    ]),
    HttpModule,
  ],
  controllers: [TransacaoController],
  providers: [
    TransacaoService,
    TransacaoSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    TransacaoRepository,
    MongooseBaseRepository,
    TransacaoJobHandler,
    {
      provide: 'NOME_MODULO',
      useValue: TransacaoModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Transacao',
    },
  ],
})
export class TransacaoModule { }
