import { Buffet, BuffetNotFoundException } from "@/buffet";
import { BaseRepository } from "@/shared/database";
import { Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { Category } from "./entity";
import { CategoryNotFoundException } from "./exceptions";
import { FilterCategoriesQuery } from "./query";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: BaseRepository<Category>,

    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,
  ) {}

  public async create(payload: CreateCategoryDto) {
    const { buffetId, ...rest } = payload;

    const buffet = await this.buffetRepository.findOne(buffetId);
    if (!buffet) {
      throw new BuffetNotFoundException();
    }

    const category = new Category({
      ...rest,
      buffet: Reference.create(buffet),
    });
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  public async findAll(query: FilterCategoriesQuery) {
    return this.categoryRepository.find(query.toDbQuery());
  }

  public async findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  public async update(id: number, payload: UpdateCategoryDto) {
    let categoryToUpdate = await this.findOne(id);
    if (!categoryToUpdate) {
      throw new CategoryNotFoundException();
    }

    const { buffetId, ...rest } = payload;

    let newBuffet: Buffet | null = null;
    if (buffetId !== undefined) {
      newBuffet = await this.buffetRepository.findOne(buffetId);
      if (!newBuffet) {
        throw new BuffetNotFoundException();
      }
    }

    categoryToUpdate = this.categoryRepository.assign(categoryToUpdate, {
      ...rest,
      buffet: newBuffet ? buffetId : categoryToUpdate.buffet?.id,
    });
    await this.categoryRepository.persistAndFlush(categoryToUpdate);
    return categoryToUpdate;
  }

  public async remove(id: number) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.categoryRepository.removeAndFlush(entity);
    }
  }
}
