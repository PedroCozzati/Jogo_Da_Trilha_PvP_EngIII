import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { PartidaSagas } from './application/sagas/partida.sagas';
import { PartidaController } from './controllers/partida.controller';
import { PartidaRepository } from './infra/data/repository/partida.repository';
import { PartidaService } from './application/services/partida.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './domain/models/partida.model';
import { PartidaJobHandler } from './jobs/handlers/partida.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { PartidaGateway } from './gateway/partida.gateway';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Partida', schema: PartidaSchema }
    ]),
    HttpModule,
  ],
  controllers: [PartidaController],
  providers: [
    PartidaService,
    PartidaSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    PartidaRepository,
    MongooseBaseRepository,
    PartidaJobHandler,
    PartidaGateway,
    {
      provide: 'NOME_MODULO',
      useValue: PartidaModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Partida',
    },
  ],
})
export class PartidaModule { }
