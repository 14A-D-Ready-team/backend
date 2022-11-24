import { BaseRepository } from "@/shared/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { Category } from "./entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: BaseRepository<Category>,
  ) {}

  public async create(payload: CreateCategoryDto) {
    const category = this.categoryRepository.create(payload);
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  public async findAll() {
    return this.categoryRepository.findAll();
  }

  public async findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  public async update(id: number, payload: UpdateCategoryDto) {
    let categoryToUpdate = await this.findOne(id);
    if (!categoryToUpdate) {
      throw new NotFoundException();
    }
    categoryToUpdate = this.categoryRepository.assign(
      categoryToUpdate,
      payload,
    );
    return this.categoryRepository.persistAndFlush(categoryToUpdate);
  }

  public async remove(id: number) {
    await this.categoryRepository.removeAndFlush({ id });
  }
}
