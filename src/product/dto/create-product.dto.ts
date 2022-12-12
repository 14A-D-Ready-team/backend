import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  public description: string;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  public fullPrice: number;

  @Expose()
  @ApiProperty({
    description:
      "If you want to unset the discounted price, set it to null, BUT NOT undefined",
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  public discountedPrice: number | null;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  public stock: number;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId: number;
}
