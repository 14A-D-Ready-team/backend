import { dbConfigProvider } from "./db-config.provider";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";

@Module({
  imports: [MikroOrmModule.forRoot(), ConfigModule.forFeature(databaseConfig)],
  providers: [dbConfigProvider],
})
export class DatabaseModule {}
