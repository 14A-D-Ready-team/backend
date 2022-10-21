import { isDevelopment } from "./../../environment";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";

export const databaseConfig: MikroOrmModuleSyncOptions = {
  type: "mysql",
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./dist/**/*.entity.d.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: isDevelopment,
  connect: false,
  discovery: { warnWhenNoEntities: false },
};
