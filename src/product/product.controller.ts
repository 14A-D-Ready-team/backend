import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFile,
  StreamableFile,
  Header,
  Res,
  ForbiddenException,
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
import { FilterProductsQuery } from "./query";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadCleanupInterceptor } from "@/shared/storage";
import { Response } from "express";
import { Action, CheckPolicies, InjectAbility } from "@/shared/policy";
import { Product } from "./entity";
import { AppAbility } from "@/app-ability.factory";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @NotFoundResponse(CategoryNotFoundException)
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @UseInterceptors(FileInterceptor("image"), UploadCleanupInterceptor)
  public create(
    @Body() createProductDto: CreateProductDto,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "image/*",
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,

    @InjectAbility() ability: AppAbility,
  ) {
    if (!ability.can(Action.Create, createProductDto)) {
      throw new ForbiddenException();
    }
    return this.productService.create(createProductDto, image);
  }

  @Get()
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @CheckPolicies(ability => ability.can(Action.Read, Product))
  public find(@Query() query: FilterProductsQuery) {
    return this.productService.find(query);
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

  @Get("/:id/image")
  @Header("Cross-Origin-Resource-Policy", "cross-origin")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async getImage(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }
    const product = await this.productService.findOne(+id);
    if (!product) {
      return;
    }

    res.setHeader("Content-Type", product.imageType);

    return new StreamableFile(product.image);
  }

  @Patch(":id")
  @NotFoundResponse(ProductNotFoundException)
  @BadRequestResponse(InvalidIdException, InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  @UseInterceptors(FileInterceptor("image"), UploadCleanupInterceptor)
  public update(
    @Param("id") id: string,

    @Body() updateProductDto: UpdateProductDto,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "image/*",
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,

    @InjectAbility() ability: AppAbility,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }

    if (!ability.can(Action.Update, updateProductDto)) {
      throw new ForbiddenException();
    }

    return this.productService.update(+id, updateProductDto, ability);
  }

  @Delete(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public remove(@Param("id") id: string, @InjectAbility() ability: AppAbility) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.productService.remove(+id, ability);
  }
}
