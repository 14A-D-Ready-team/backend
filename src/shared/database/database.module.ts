import { databaseConfig } from "./database.config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
@Global()
@Module({
  imports: [MikroOrmModule.forRoot(databaseConfig)],
  providers: [DatabaseService],
})
export class DatabaseModule {}
