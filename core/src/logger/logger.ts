import Pino, { Logger } from 'pino';
import { LoggerOptions, destination } from 'pino';
import { trace, context } from '@opentelemetry/api';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  formatters: {
    bindings(bindings) {
      return { ...bindings, job: process.env.OTEL_SERVICE_NAME }
    },
    level(label) {
      return { level: label };
    },
    // Workaround for PinoInstrumentation (does not support latest version yet)
    log(object) {
      console.log('tá chegando aqui')
      const span = trace.getSpan(context.active());
      console.log('span: ' + JSON.stringify(span))
      if (!span) return { ...object };
      console.log('tem span')
      const { spanId, traceId } = trace
        .getSpan(context.active())
        ?.spanContext();
      return { ...object, spanId, traceId };
    },
  },
  // prettifier: process.env.NODE_ENV === 'local' ? require('pino-pretty') : false,
};

export const logger: Logger = Pino(
  loggerOptions,
  destination(process.env.LOG_FILE_NAME),
);