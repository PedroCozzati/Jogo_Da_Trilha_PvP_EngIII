import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { NivelSagas } from './application/sagas/nivel.sagas';
import { NivelController } from './controllers/nivel.controller';
import { NivelRepository } from './infra/data/repository/nivel.repository';
import { NivelService } from './application/services/nivel.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { NivelSchema } from './domain/models/nivel.model';
import { NivelJobHandler } from './jobs/handlers/nivel.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Nivel', schema: NivelSchema }
    ]),
    HttpModule,
  ],
  controllers: [NivelController],
  providers: [
    NivelService,
    NivelSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    NivelRepository,
    MongooseBaseRepository,
    NivelJobHandler,
    {
      provide: 'NOME_MODULO',
      useValue: NivelModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Nivel',
    },
  ],
})
export class NivelModule { }
