import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  public name: string;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public buffetId: number;
}
