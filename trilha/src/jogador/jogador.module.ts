import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { JogadorSagas } from './application/sagas/jogador.sagas';
import { JogadorController } from './controllers/jogador.controller';
import { JogadorRepository } from './infra/data/repository/jogador.repository';
import { JogadorService } from './application/services/jogador.service';
import { QueryHandlers } from './domain/queries/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './domain/models/jogador.model';
import { JogadorJobHandler } from './jobs/handlers/jogador.job.handler';
import { HttpModule } from '@nestjs/axios';
import { MongooseBaseRepository } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { JogadorGateway } from './gateway/jogador.gateway';

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Jogador', schema: JogadorSchema }
    ]),
    HttpModule,
  ],
  controllers: [JogadorController],
  providers: [
    JogadorService,
    JogadorSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    JogadorRepository,
    MongooseBaseRepository,
    JogadorGateway,
    JogadorJobHandler,
    {
      provide: 'NOME_MODULO',
      useValue: JogadorModule.name,
    },
    {
      provide: 'NOME_MODEL_MONGOOSE',
      useValue: 'Jogador',
    },
  ],
})
export class JogadorModule { }
