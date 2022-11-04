import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "./entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      Admin,
      Customer,
      BuffetOwner,
      BuffetWorker,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
