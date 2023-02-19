import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class EditOptionDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  public name!: string;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  public extraCost!: number;
}
