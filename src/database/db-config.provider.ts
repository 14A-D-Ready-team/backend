import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroOrmModuleSyncOptions } from "./../../node_modules/@mikro-orm/nestjs/typings.d";
import { MIKRO_ORM_MODULE_OPTIONS } from "@mikro-orm/nestjs";
import { FactoryProvider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const dbConfigProvider: FactoryProvider = {
  provide: MIKRO_ORM_MODULE_OPTIONS,
  useFactory(configService: ConfigService): MikroOrmModuleSyncOptions {
    return {
      type: "mysql",
      entities: ["./dist/**/*.entity.js"],
      entitiesTs: ["./dist/**/*.entity.d.ts"],
      metadataProvider: TsMorphMetadataProvider,
      debug: configService.get("NODE_ENV") === "development",
      dbName: "jmimomue",
      user: "jmimomue",
      password: "HfuNNQlrVPlLjB42ZHOysW35zH5kgd41",
      host: "ella.db.elephantsql.com",
    };
  },
  inject: [ConfigService],
};
