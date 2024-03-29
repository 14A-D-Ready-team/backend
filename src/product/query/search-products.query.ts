import { PaginationQuery } from "@/shared/pagination";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchProductsQuery extends PaginationQuery {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public search: string;
}
