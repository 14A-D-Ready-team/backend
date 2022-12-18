import { Category } from "@/category";
import { CategoryNotFoundException } from "@/category";
import { BaseRepository } from "@/shared/database";
import { PaginatedResponse } from "@/shared/pagination";
import { Reference } from "@mikro-orm/core";
import type { OperatorMap } from "@mikro-orm/core/typings";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Customization, Option, Product } from "./entity";
import { ProductNotFoundException } from "./exceptions";
import { OptionCount } from "./option-count.enum";
import { FilterProductsQuery } from "./query";

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

  public async find(
    query: FilterProductsQuery,
  ): Promise<PaginatedResponse<Product>> {
    const category = await this.getCategoryFromQuery(query);

    const fullPrice = this.createPriceQuery(query, "fullPrice");
    const discountedPrice = this.createPriceQuery(query, "discountedPrice");

    const [products, count] = await this.productRepository.findAndCount(
      {
        ...(category ? { category } : {}),
        ...(fullPrice ? { fullPrice } : {}),
        ...(discountedPrice ? { discountedPrice } : {}),
      },
      {
        limit: query.take === undefined ? (null as any) : query.take,
        offset: query.skip,
      },
    );

    return new PaginatedResponse(products, count);
  }

  public findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  public async update(id: number, payload: UpdateProductDto) {
    let productToUpdate = await this.findOne(id);
    if (!productToUpdate) {
      throw new ProductNotFoundException();
    }

    if (payload.categoryId) {
      const category = await this.categoryRepository.findOne(
        payload.categoryId,
      );
      if (!category) {
        throw new CategoryNotFoundException();
      }
      productToUpdate.category = Reference.create(category);
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

  private async getCategoryFromQuery(
    query: FilterProductsQuery,
  ): Promise<Category | undefined> {
    if (!query.categoryId) {
      return;
    }

    const category = await this.categoryRepository.findOne(query.categoryId);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    return category;
  }

  private createPriceQuery(
    query: FilterProductsQuery,
    pricePropertyName: "fullPrice" | "discountedPrice",
  ) {
    let priceQuery: OperatorMap<number> | undefined = undefined;

    const priceProperty = query[pricePropertyName];
    if (priceProperty) {
      if (priceProperty.value != undefined) {
        priceQuery = { $eq: priceProperty.value };
      } else {
        priceQuery = {
          $gte: priceProperty.min,
          $lte: priceProperty.max,
        };
      }
    }
    return priceQuery;
  }
}
