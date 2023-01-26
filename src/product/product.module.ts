import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Product } from "./entity";
import { Category } from "@/category";

@Module({
  imports: [MikroOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
