import { UserRepository } from './../user/user.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
