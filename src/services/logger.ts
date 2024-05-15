import { loggerConfig } from 'configuration';
import { addColors, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

const LogLevelOrder: LogLevel[] = [
  LogLevel.ERROR,
  LogLevel.WARN,
  LogLevel.INFO,
  LogLevel.DEBUG,
  LogLevel.VERBOSE,
];

const LogLevelColor: string[] = ['red', 'yellow', 'green', 'cyan', 'gray'];

const commonMessageFormat = format((info) => {
  if (!info.pid) {
    info.pid = process.pid;
  }

  info.level = info.level.toUpperCase();

  return info;
});

const commonMessagePrint = format.printf((info) => {
  let output = `${info.timestamp} ${info.level} ${info.pid} ${info.context} `;
  if (info.stack) {
    output += `${info.stack}`;
  } else {
    output += info.message;
  }
  return output;
});

const createNestLogLevels = () => {
  const levels: { [key: string]: number } = {};
  const colors: { [key: string]: string } = {};
  LogLevelOrder.forEach((e, i) => {
    levels[e] = i;
    colors[e] = LogLevelColor[i];
  });
  addColors(colors);
  return levels;
};

const winstonLogger = createLogger({
  levels: createNestLogLevels(),
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/app.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: loggerConfig.maxFiles,
      level: loggerConfig.level,
      format: format.combine(commonMessagePrint),
      auditFile: 'logs/.audit/app.json',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/app-error.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: loggerConfig.maxFiles,
      level: LogLevel.ERROR,
      format: format.combine(commonMessagePrint),
      auditFile: 'logs/.audit/app-error.json',
    }),
  ],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
    commonMessageFormat(),
  ),
});

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(
    new transports.Console({
      level: loggerConfig.level,
      format: format.combine(
        commonMessagePrint,
        format.colorize({ all: true }),
      ),
    }),
  );
}

export const logger = {
  verbose(message: any, context?: string): void {
    winstonLogger.log(LogLevel.VERBOSE, message, { context });
  },

  debug(message: any, context?: string): void {
    winstonLogger.log(LogLevel.DEBUG, message, { context });
  },

  log(message: any, context?: string): void {
    winstonLogger.log(LogLevel.INFO, message, { context });
  },

  warn(message: any, context?: string): void {
    winstonLogger.log(LogLevel.WARN, message, { context });
  },

  error(message: any, stack?: string, context?: string): void {
    const hasStack = !!context;
    winstonLogger.log(LogLevel.ERROR, {
      context: hasStack ? context : stack,
      message: hasStack ? new Error(message) : message,
    });
  },
};
