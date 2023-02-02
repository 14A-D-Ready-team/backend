import { StringFilterQuery } from "@/shared/filtering";
import { PaginationQuery } from "@/shared/pagination";
import { Expose } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";
import { omitBy } from "lodash";

export class SearchBuffetsQuery extends StringFilterQuery {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public search: string;

  public toDbQuery() {
    const query = {
      ...(this.search && { search: this.search }),
    };
    return omitBy(query, value => value === undefined);
  }
}
