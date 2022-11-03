import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { authConfig } from "./auth.config";
import { User } from "@/user";
import { TokenModule } from "@/token";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature([User]),
    TokenModule,
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class AuthModule {}
