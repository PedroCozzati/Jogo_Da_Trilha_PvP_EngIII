import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from '@gabriel.cora/eng.soft.jogo.da.trilha.core/dist/open-telemetry/tracer';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  await app.listen(90);
}
bootstrap();
