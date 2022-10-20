import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      envFilePath: [".env", ".env.development"],
    }),
    MikroOrmModule.forRoot({
      type: "mysql",
      entities: ["./dist/**/*.entity.js"],
      entitiesTs: ["./dist/**/*.entity.d.ts"],
      metadataProvider: TsMorphMetadataProvider,
      debug: true,
      dbName: "jmimomue",
      user: "jmimomue",
      password: "HfuNNQlrVPlLjB42ZHOysW35zH5kgd41",
      host: "ella.db.elephantsql.com",
      asd: "",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log(configService);
  }
}

const a = () => {};
