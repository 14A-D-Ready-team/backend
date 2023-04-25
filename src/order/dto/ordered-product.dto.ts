import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsNumber } from "class-validator";

export class OrderedProductDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  public productId!: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  public amount!: number;

  @Expose()
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  public selectedOptionIds!: number[];
}
