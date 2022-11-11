import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { authConfig, AuthModule } from "./auth";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@shared/database";
import { ValidationModule } from "@shared/validation";
import { UserModule } from "./user";
import { TokenModule } from "./token";
import { SerializerInterceptor } from "@shared/serialization";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      load: [authConfig],
    }),
    ValidationModule,
    UserModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SerializerInterceptor },
  ],
})
export class AppModule {}
