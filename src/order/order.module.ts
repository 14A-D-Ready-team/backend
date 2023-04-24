import { Module } from "@nestjs/common";
import { Order } from "./entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { StorageModule, MulterConfigService } from "@/shared/storage";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    MikroOrmModule.forFeature([Order]),
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService,
    }),
  ],
  exports: [],
})
export class OrderModule {}
