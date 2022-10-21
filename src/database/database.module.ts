import { dbConfigProvider } from "./db-config.provider";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: "mysql",
      entities: ["./dist/**/*.entity.js"],
      entitiesTs: ["./dist/**/*.entity.d.ts"],
      metadataProvider: TsMorphMetadataProvider,
      debug: process.env.NODE_ENV === "development",
      dbName: "jmimomue",
      user: "jmimomue",
      password: "HfuNNQlrVPlLjB42ZHOysW35zH5kgd41",
      host: "ella.db.elephantsql.com",
    }),
  ],
  providers: [dbConfigProvider],
})
export class DatabaseModule {}
