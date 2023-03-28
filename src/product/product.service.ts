import { AppAbility } from "@/app-ability.factory";
import { Category } from "@/category";
import { CategoryNotFoundException } from "@/category";
import { BaseRepository } from "@/shared/database";
import { PaginatedResponse } from "@/shared/pagination";
import { Action } from "@/shared/policy";
import { Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { omit } from "lodash";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entity";
import { ProductNotFoundException } from "./exceptions";
import { FilterProductsQuery } from "./query";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: BaseRepository<Product>,

    @InjectRepository(Category)
    private categoryRepository: BaseRepository<Category>,
  ) {}

  public async create(payload: CreateProductDto, image: Express.Multer.File) {
    const category: Category | null = await this.categoryRepository.findOne(
      payload.categoryId,
    );
    if (!category) {
      throw new CategoryNotFoundException();
    }

    const data = {
      ...omit(payload, "categoryId"),
      category: Reference.create(category),
      discountedPrice: payload.discountedPrice
        ? payload.discountedPrice.toString()
        : undefined,
      fullPrice: payload.fullPrice.toString(),
      image: await readFile(image.path),
      imageType: image.mimetype,
    };

    const product = new Product(data, true);

    await this.productRepository.persistAndFlush(product);
    return product;
  }

  public async find(
    query: FilterProductsQuery,
  ): Promise<PaginatedResponse<Product>> {
    const [products, count] = await this.productRepository.findAndCount(
      query.toDbQuery(),
      {
        limit: query.take === undefined ? (null as any) : query.take,
        offset: query.skip,
      },
    );

    return new PaginatedResponse(products, count);
  }

  public findOne(id: number) {
    return this.productRepository.findOneOrFail(id, {
      failHandler: () => new ProductNotFoundException(),
    });
  }

  public async update(
    id: number,
    payload: UpdateProductDto,
    ability: AppAbility,
  ) {
    let productToUpdate = await this.findOne(id);
    if (!productToUpdate) {
      throw new ProductNotFoundException();
    }

    if (!ability.can(Action.Update, productToUpdate)) {
      throw new ForbiddenException();
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

    const data = {
      ...omit(payload, "categoryId", "discountedPrice", "fullPrice"),
      ...(payload.discountedPrice !== undefined
        ? { discountedPrice: payload.discountedPrice?.toString() }
        : {}),
      ...(payload.fullPrice !== undefined
        ? { fullPrice: payload.fullPrice.toString() }
        : {}),
    };

    productToUpdate = this.productRepository.assign(productToUpdate, data);

    await this.productRepository.persistAndFlush(productToUpdate);
    return productToUpdate;
  }

  public async remove(id: number, ability: AppAbility) {
    const entity = await this.findOne(id);
    if (!entity) {
      return;
    }

    if (!ability.can(Action.Delete, entity)) {
      throw new ForbiddenException();
    }

    await this.productRepository.removeAndFlush(entity);
  }
}
