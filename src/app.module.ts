import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./shared/database/database.module";
import TestEntity from "./test/test.entity";
import { TestModule } from "./test/test.module";

@Module({
  imports: [
    MikroOrmModule.forFeature([TestEntity]),
    DatabaseModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
