import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { authConfig, AuthModule } from "./auth";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@shared/database";
import { ValidationModule } from "@shared/validation";
import { UserModule } from "@/user";
import { TokenModule } from "@/token";
import { sessionConfig, SessionMiddleware } from "@shared/session";
import { SerializationModule } from "@shared/serialization";
import { PolicyModule } from "@/shared/policy";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      load: [authConfig, sessionConfig],
    }),
    SerializationModule,
    ValidationModule,
    PolicyModule,
    UserModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes("*");
  }
}
