import { StringFilterQuery } from "@/shared/filtering";
import { PaginationQuery } from "@/shared/pagination";
import { Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";
import { omitBy } from "lodash";

export class SearchBuffetsQuery extends PaginationQuery {
  @Expose()
  // @IsString()
  // @IsNotEmpty()
  public search!: StringFilterQuery;

  public toDbQuery() {
    const query = {
      ...(this.search && { search: this.search.toDbQuery() }),
    };
    return omitBy(query, search => search === undefined);
  }
}
