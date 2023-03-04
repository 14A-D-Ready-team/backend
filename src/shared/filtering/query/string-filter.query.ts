import { OperatorMap } from "@mikro-orm/core/typings";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class StringFilterQuery {
  @Expose()
  @IsOptional()
  @IsString()
  public searchString?: string;

  public toDbQuery(): OperatorMap<string> | undefined {
    if (this.searchString != undefined) {
      return { $like: "%" + this.searchString + "%" };
    }

    return undefined;
  }
}
