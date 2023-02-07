import { StringFilterQuery } from "@/shared/filtering";
import { PaginationQuery } from "@/shared/pagination";
import { Expose } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { omitBy } from "lodash";

export class SearchBuffetsQuery extends PaginationQuery {
  @Expose()
  @IsOptional()
  public search?: StringFilterQuery;

  @Expose()
  @IsOptional()
  @IsIn(["name"])
  public orderByField?: string; 

  @Expose()
  @IsOptional()
  @IsIn(["ASC", "DESC"])
  public order?: string; 

  public toDbQuery() {
    const query = {
      ...(this.search && { name: this.search.toDbQuery() }),
    };
    return omitBy(query, search => search === undefined);
  }
}
