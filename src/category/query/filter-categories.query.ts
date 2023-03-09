import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FilterCategoriesQuery {
  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsOptional()
  @ApiProperty()
  public buffetId?: number;

  public toDbQuery() {
    const query = {
      ...(this.buffetId && { buffet: this.buffetId }),
    };
    return query;
  }
}
