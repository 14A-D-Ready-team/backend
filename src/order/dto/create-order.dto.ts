import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateOrderDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  public total: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  public orderNumber: number;

  @Expose()
  @ApiProperty()
  @IsDate()
  public date: Date;

  @Expose()
  @ApiProperty()
  @IsDate()
  public pickupTime: Date;
}
