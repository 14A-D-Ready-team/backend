import { Module } from "@nestjs/common";
import { BuffetService } from "./buffet.service";
import { BuffetController } from "./buffet.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Buffet } from "./entity/buffet.entity";
import { User } from "@/user";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService, StorageModule } from "@/shared/storage";
import { BuffetAbilityFactory } from "./buffet-ability.factory";

@Module({
  providers: [BuffetService, BuffetAbilityFactory],
  controllers: [BuffetController],
  imports: [MikroOrmModule.forFeature([Buffet, User]),
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService
    })
  ],
  exports: [BuffetAbilityFactory]
})
export class BuffetModule {}
