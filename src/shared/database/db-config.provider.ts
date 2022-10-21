import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import {
  MIKRO_ORM_MODULE_OPTIONS,
  MikroOrmModuleSyncOptions,
} from "@mikro-orm/nestjs";
import { FactoryProvider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import databaseConfig from "./database.config";

export const dbConfigProvider: FactoryProvider = {
  provide: MIKRO_ORM_MODULE_OPTIONS,
  useFactory(configService: ConfigService): MikroOrmModuleSyncOptions {
    const configFromEnv = configService.get("database");

    console.log(configFromEnv);

    return {
      type: "mysql",
      entities: ["./dist/**/*.entity.js"],
      entitiesTs: ["./dist/**/*.entity.d.ts"],
      metadataProvider: TsMorphMetadataProvider,
      debug: configService.get("NODE_ENV") === "development",
      dbName: "",
      user: "",
      password: "",
      host: "",
    };
  },
  inject: [ConfigService],
};
