import { APP_INTERCEPTOR } from "@nestjs/core";
import { ValidationModule } from "./shared/validation/validation.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./shared/database/database.module";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";
import { authConfig, AuthModule } from "./auth";
import { ConfigModule } from "@nestjs/config";
import { SerializerInterceptor } from "@shared/serialization";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TokenModule,
    ValidationModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      load: [authConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SerializerInterceptor },
  ],
})
export class AppModule {}
