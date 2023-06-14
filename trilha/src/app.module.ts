import { CoreModule } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JogadorModule } from './jogador/jogador.module';
import { PecaModule } from './peca/peca.module';
import { TabuleiroModule } from './tabuleiro/tabuleiro.module';
import { NivelModule } from './nivel/nivel.module';
import { PartidaModule } from './partida/partida.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    CoreModule,
    JogadorModule,
    PecaModule,
    TabuleiroModule,
    NivelModule,
    PartidaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
