import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { TabuleiroSagas } from './application/sagas/tabuleiro.sagas';
import { TabuleiroController } from './controllers/tabuleiro.controller';
import { TabuleiroRepository } from './infra/data/repository/tabuleiro.repository';
import { TabuleiroService } from './application/services/tabuleiro.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TabuleiroSchema } from './domain/models/tabuleiro.model';
import { TabuleiroJobHandler } from './jobs/handlers/tabuleiro.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Tabuleiro', schema: TabuleiroSchema }
    ]),
    HttpModule,
  ],
  controllers: [TabuleiroController],
  providers: [
    TabuleiroService,
    TabuleiroSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    TabuleiroRepository,
    MongooseBaseRepository,
    TabuleiroJobHandler,
    {
      provide: 'NOME_MODULO',
      useValue: TabuleiroModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Tabuleiro',
    },
  ],
})
export class TabuleiroModule { }
