import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "./entity";
import { UserAbilityFactory } from "./user-ability.factory";
import { BuffetInviteToken } from "@/buffet/entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      Admin,
      Customer,
      BuffetOwner,
      BuffetWorker,
      BuffetInviteToken,
    ]),
  ],
  providers: [UserService, UserAbilityFactory],
  controllers: [UserController],
  exports: [UserService, UserAbilityFactory],
})
export class UserModule {}
