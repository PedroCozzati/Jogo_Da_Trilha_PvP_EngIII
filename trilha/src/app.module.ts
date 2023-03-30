import { CoreModule } from '@gabriel.cora/eng.soft.jogo.da.trilha.core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JogadorModule } from './jogador/jogador.module';
import { PecaModule } from './peca/peca.module';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    JogadorModule,
    TransacaoModule,
    PecaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
