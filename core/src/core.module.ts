import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from './logger/logger.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
      defaultAttributes: { 'app': process.env.OTEL_SERVICE_NAME },
    },
  },
});

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    OpenTelemetryModuleConfig,
    LoggerModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class CoreModule { }
