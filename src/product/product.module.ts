import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Product } from "./entity";
import { Category } from "@/category";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadModule, MulterConfigService } from "@shared/file-upload";
@Module({
  imports: [
    MikroOrmModule.forFeature([Product, Category]),
    MulterModule.registerAsync({
      imports: [FileUploadModule],
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
