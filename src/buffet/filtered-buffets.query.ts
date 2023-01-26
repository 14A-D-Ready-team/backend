import { PaginationQuery } from "@shared/pagination";
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

export class FilterBuffetsQuery extends PaginationQuery {
  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public coords?: NumberFilterQuery;

  public toDbQuery() {
    const query = {
      ...(this.coords && { coords: this.coords.toDbQuery() }),
    };
    return omitBy(query, value => value === undefined);
  }
}
