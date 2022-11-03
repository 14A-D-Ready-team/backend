import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";
import { isDevelopment } from "@/environment";
import { BaseRepository } from "./base.repository";

export const databaseConfig: MikroOrmModuleSyncOptions = {
  type: "mysql",
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./dist/**/*.entity.d.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: isDevelopment,
  connect: true,
  discovery: { warnWhenNoEntities: false },
  entityRepository: BaseRepository,
};
