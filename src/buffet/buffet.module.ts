import { Module } from "@nestjs/common";
import { BuffetService } from "./buffet.service";
import { BuffetController } from "./buffet.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Buffet } from "./entity/buffet.entity";
import { User } from "@/user";

@Module({
  providers: [BuffetService],
  controllers: [BuffetController],
  imports: [MikroOrmModule.forFeature([Buffet, User])],
})
export class BuffetModule {}
