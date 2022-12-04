import { InvalidIdException } from "@/shared/exceptions";
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  ServiceUnavailableResponse,
} from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation/exceptions";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { omitBy } from "lodash";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @BadRequestResponse(InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async findOne(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  @NotFoundResponse()
  @BadRequestResponse(InvalidIdException, InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }
    updateCategoryDto = omitBy(updateCategoryDto, value => value === null);
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async remove(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.categoryService.remove(+id);
  }
}
