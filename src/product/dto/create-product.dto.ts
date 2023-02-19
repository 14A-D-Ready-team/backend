import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsInstance,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { EditCustomizationDto } from "./edit-customization.dto";

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
  @MaxLength(800)
  public description: string;

  @Expose()
  @ApiProperty()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  public fullPrice: number;

  @Expose()
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined;
    }

    if (["null", null].includes(value)) {
      return null;
    }

    return +value;
  })
  @ApiProperty({
    description: `If you want to unset the discounted price, set it to null, BUT NOT undefined. 
    For update, undefined means no change, null means unset.`,
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

  @Expose()
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined;
    }

    const obj = JSON.parse(value);
    return plainToInstance(EditCustomizationDto, obj);
  })
  @ApiProperty()
  @IsDefined()
  @IsArray()
  @IsInstance(EditCustomizationDto, { each: true })
  @ApiProperty()
  public customizations: EditCustomizationDto[];
}
