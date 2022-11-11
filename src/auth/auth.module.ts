import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { authConfig } from "./auth.config";
import { User } from "@/user/entity";
import { TokenModule } from "@/token";
import { AuthenticationGuard } from "./guards";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature([User]),
    TokenModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, AuthenticationGuard],
  exports: [AuthenticationGuard],
})
export class AuthModule {}
