import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";
import { isDevelopment } from "@/environment";
import { BaseRepository } from "./base.repository";
import { kebabCase } from "lodash";
import { LoadStrategy } from "@mikro-orm/core";

export default {
  entities: ["./dist/**/*.entity.js"],
  entitiesTs: ["./dist/**/*.entity.d.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: isDevelopment,
  connect: true,
  discovery: { warnWhenNoEntities: false },
  loadStrategy: LoadStrategy.JOINED,
  entityRepository: BaseRepository,
  schemaGenerator: {
    disableForeignKeys: false,
  },

  seeder: {
    path: "dist/shared/database/seeders",
    pathTs: "src/shared/database/seeders",
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => kebabCase(className) + ".seeder", // seeder file naming convention
  },
  migrations: {
    pathTs: "src/shared/database/migrations",
    path: "dist/shared/database/migrations",
  },
} as MikroOrmModuleSyncOptions;
