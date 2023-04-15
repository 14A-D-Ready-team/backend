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
  Query,
  ForbiddenException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { omitBy } from "lodash";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { CategoryNotFoundException } from "./exceptions";
import { FilterCategoriesQuery } from "./query";
import { Action, InjectAbility } from "@/shared/policy";
import { AppAbility } from "@/app-ability.factory";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @BadRequestResponse(InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @InjectAbility() ability: AppAbility,
  ) {
    if (!ability.can(Action.Create, createCategoryDto)) {
      throw new ForbiddenException();
    }

    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async findAll(@Query() query: FilterCategoriesQuery) {
    return this.categoryService.findAll(query);
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
  @NotFoundResponse(CategoryNotFoundException)
  @BadRequestResponse(InvalidIdException, InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @InjectAbility() ability: AppAbility,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }

    if (!ability.can(Action.Update, updateCategoryDto)) {
      throw new ForbiddenException();
    }

    updateCategoryDto = omitBy(updateCategoryDto, value => value === null);
    return this.categoryService.update(+id, updateCategoryDto, ability);
  }

  @Delete(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public async remove(
    @Param("id") id: string,
    @InjectAbility() ability: AppAbility,
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.categoryService.remove(+id, ability);
  }
}
