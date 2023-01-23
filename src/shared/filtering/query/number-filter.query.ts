import { OperatorMap } from "@mikro-orm/core/typings";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { omitBy } from "lodash";

export class NumberFilterQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public min?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public max?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public value?: number;

  public toDbQuery(): OperatorMap<number> | undefined {
    if (this.value != undefined) {
      return { $eq: this.value };
    }
    if (this.min != undefined || this.max != undefined) {
      return omitBy(
        {
          $gte: this.min,
          $lte: this.max,
        },
        value => value == undefined,
      );
    }

    return undefined;
  }
}
