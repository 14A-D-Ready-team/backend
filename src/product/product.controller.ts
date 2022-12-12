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
import { ApiTags } from "@nestjs/swagger";
import { InvalidIdException } from "@/shared/exceptions";
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
} from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { ProductNotFoundException } from "./exceptions";
import { CategoryNotFoundException } from "@/category";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @NotFoundResponse(CategoryNotFoundException)
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public findOne(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  @NotFoundResponse(ProductNotFoundException)
  @BadRequestResponse(InvalidIdException, InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
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
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public remove(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.remove(+id);
  }
}
