import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import authConfig from "./auth.config";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class AuthModule {}
