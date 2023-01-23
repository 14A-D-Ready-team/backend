import { OperatorMap } from "@mikro-orm/core/typings";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { omitBy } from "lodash";

export class NumberFilterQuery {
  @Expose()
  @IsOptional()
  @IsString()
  public stringToFiler?: string;

  public toDbQuery(): OperatorMap<string> | undefined {

    let strings : string[];

    

    // if (this.value != undefined) {
    //   return { $eq: this.value };
    // }
    // if (this.min != undefined || this.max != undefined) {
    //   return omitBy(
    //     {
    //       $gte: this.min,
    //       $lte: this.max,
    //     },
    //     value => value == undefined,
    //   );
    // }

    return undefined;
  }
}
