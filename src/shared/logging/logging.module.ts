import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import pino from "pino";
import { loggingConfig } from "./logging.config";
import { PrettyOptions } from "pino-pretty";

const loggerConfigFactory = (config: ConfigType<typeof loggingConfig>) => {
  const stream = config.logToFile
    ? pino.destination({
        dest: config.destination,
        sync: true,
        mkdir: true,
      })
    : undefined;

  const transport = config.logToFile
    ? undefined
    : {
        target: "pino-pretty",
        options: {} as PrettyOptions,
      };

  return {
    pinoHttp: {
      transport,
      stream,
      level: config.logLevel,
    },
  };
};

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(loggingConfig),
    LoggerModule.forRootAsync({
      imports: [ConfigModule.forFeature(loggingConfig)],
      useFactory: loggerConfigFactory,
      inject: [loggingConfig.KEY],
    }),
  ],
})
export class LoggingModule {}
