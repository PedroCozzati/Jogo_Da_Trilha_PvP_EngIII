import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { PecaSagas } from './application/sagas/peca.sagas';
import { PecaController } from './controllers/peca.controller';
import { PecaRepository } from './infra/data/repository/peca.repository';
import { PecaService } from './application/services/peca.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PecaSchema } from './domain/models/peca.model';
import { PecaJobHandler } from './jobs/handlers/peca.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Peca', schema: PecaSchema }
    ]),
    HttpModule,
  ],
  controllers: [PecaController],
  providers: [
    PecaService,
    PecaSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    PecaRepository,
    MongooseBaseRepository,
    PecaJobHandler,
    {
      provide: 'NOME_MODULO',
      useValue: PecaModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Peca',
    },
  ],
})
export class PecaModule { }
