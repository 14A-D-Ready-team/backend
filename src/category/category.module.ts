import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Category } from "./entity";
import { Buffet } from "@/buffet";
import { CategoryAbilityFactory } from "./category-ability.factory";

@Module({
  imports: [MikroOrmModule.forFeature([Category, Buffet])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryAbilityFactory],
  exports: [CategoryAbilityFactory],
})
export class CategoryModule {}
