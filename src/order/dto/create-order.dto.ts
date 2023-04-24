import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { OrderedProductDto } from "./ordered-product.dto";

export class CreateOrderDto {
  @Expose()
  @ApiProperty()
  @IsDate()
  @IsOptional()
  public requestedPickup?: Date;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsOptional()
  public message?: string;

  @Expose()
  @Type(() => OrderedProductDto)
  public products: OrderedProductDto[];
}
