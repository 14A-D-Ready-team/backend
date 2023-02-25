import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Product } from "./entity";
import { Category } from "@/category";
import { MulterModule } from "@nestjs/platform-express";
import { StorageModule, MulterConfigService } from "@/shared/storage";
import { ProductAbilityFactory } from "./product-ability.factory";
@Module({
  imports: [
    MikroOrmModule.forFeature([Product, Category]),
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductAbilityFactory],
  exports: [ProductAbilityFactory],
})
export class ProductModule {}
