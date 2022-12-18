import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
import {
  InvalidDataException,
  InvalidJsonException,
} from "@/shared/validation";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { ProductNotFoundException } from "./exceptions";
import { CategoryNotFoundException } from "@/category";
import { FilterProductsQuery, SearchProductsQuery } from "./query";

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
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public find(@Query() query: FilterProductsQuery) {
    return this.productService.find(query);
  }

  @Get("search")
  @BadRequestResponse(InvalidDataException, InvalidJsonException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public search(@Query() query: SearchProductsQuery) {}

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
