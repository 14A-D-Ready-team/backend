import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags } from "@nestjs/swagger";
import { InvalidIdException } from "@/shared/exceptions";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  public findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  public findOne(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  public update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(":id")
  public remove(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.remove(+id);
  }
}
