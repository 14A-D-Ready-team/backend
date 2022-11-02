import { UserRepository } from "./user/user.repository";
import { ValidationModule } from "./shared/validation/validation.module";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./shared/database/database.module";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TokenModule,
    ValidationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
