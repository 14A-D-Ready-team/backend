import { Module } from "@nestjs/common";
import { Order } from "./entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { StorageModule, MulterConfigService } from "@/shared/storage";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MulterModule } from "@nestjs/platform-express";
import { Buffet } from "@/buffet/entity";
import { Option, Product } from "@/product/entity";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    MikroOrmModule.forFeature([Order, Product, Buffet, Option]),
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService,
    }),
  ],
  exports: [],
})
export class OrderModule {}
