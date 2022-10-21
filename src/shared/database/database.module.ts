import { databaseConfig } from "./database.config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module, OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Global()
@Module({
  imports: [MikroOrmModule.forRoot(databaseConfig)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private databaseService: DatabaseService) {}

  public async onModuleInit() {
    await this.databaseService.connect();
  }
}
