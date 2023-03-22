import { StringFilterQuery } from "@/shared/filtering";
import { PaginationQuery } from "@/shared/pagination";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { omitBy } from "lodash";

export class SearchBuffetsQuery extends PaginationQuery {
  @Expose()
  @IsOptional()
  @ApiProperty()
  public search?: StringFilterQuery;

  @Expose()
  @IsOptional()
  @IsIn(["name"])
  @ApiProperty()
  public orderByField?: string;

  @Expose()
  @IsOptional()
  @IsIn(["ASC", "DESC"])
  @ApiProperty()
  public order?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  public own?: boolean;

  public toDbQuery() {
    const query = {
      ...(this.search && { name: this.search.toDbQuery() }),
    };
    return omitBy(query, search => search === undefined);
  }
}
