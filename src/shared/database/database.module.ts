import { databaseConfig } from "./database.config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
@Global()
@Module({
  imports: [MikroOrmModule.forRoot(databaseConfig)],
})
export class DatabaseModule {}
