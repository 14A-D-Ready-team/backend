import { Category } from "@/category";
import { CategoryNotFoundException } from "@/category";
import { BaseRepository } from "@/shared/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Customization, Option, Product } from "./entity";
import { ProductNotFoundException } from "./exceptions";
import { OptionCount } from "./option-count.enum";

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

    await this.productRepository.persistAndFlush(product);
    return product;
  }

  public findAll() {
    return this.productRepository.findAll();
  }

  public findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  public async update(id: number, payload: UpdateProductDto) {
    let productToUpdate = await this.findOne(id);
    if (!productToUpdate) {
      throw new ProductNotFoundException();
    }
    productToUpdate = this.productRepository.assign(productToUpdate, payload);
    await this.productRepository.persistAndFlush(productToUpdate);
    return productToUpdate;
  }

  public async remove(id: number) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.productRepository.removeAndFlush(entity);
    }
  }
}
