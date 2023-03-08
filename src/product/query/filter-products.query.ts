import { PaginationQuery } from "@/shared/pagination";
import { NumberFilterQuery } from "@shared/filtering";
import { Expose } from "class-transformer";
import {
  IsInstance,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";
import { omitBy } from "lodash";

export class FilterProductsQuery extends PaginationQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public buffetId?: number;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public fullPrice?: NumberFilterQuery;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public discountedPrice?: NumberFilterQuery;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public stock?: NumberFilterQuery;

  public toDbQuery() {
    const category = {
      $and: [] as any[],
    };

    if (this.categoryId) {
      category.$and.push({ id: this.categoryId });
    }

    if (this.buffetId) {
      category.$and.push({ buffet: this.buffetId });
    }

    const query = {
      category,
      ...(this.fullPrice && { fullPrice: this.fullPrice.toDbQuery() }),
      ...(this.discountedPrice && {
        discountedPrice: this.discountedPrice.toDbQuery(),
      }),
      ...(this.stock && { stock: this.stock.toDbQuery() }),
    };
    return omitBy(query, value => value === undefined);
  }
}
