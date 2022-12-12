import { Category } from "@/category";
import { CategoryNotFoundException } from "@/category";
import { BaseRepository } from "@/shared/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: BaseRepository<Product>,

    @InjectRepository(Category)
    private categoryRepository: BaseRepository<Category>,
  ) {}

  public async create(payload: CreateProductDto) {
    const category = await this.categoryRepository.findOne(payload.categoryId);
    if (!category) {
      throw new CategoryNotFoundException();
    }

    const product = this.productRepository.create({
      ...payload,
      category,
      discountedPrice: payload.discountedPrice
        ? payload.discountedPrice
        : undefined,
    });
    await this.productRepository.persistAndFlush(category);
    return category;
  }

  public findAll() {
    return `This action returns all product`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  public update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
