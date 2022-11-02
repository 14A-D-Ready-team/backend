import { TokenModule } from './../token/token.module';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import authConfig from "./auth.config";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { User } from "src/user/entity";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature([User]),
    TokenModule
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
})
export class AuthModule {}
