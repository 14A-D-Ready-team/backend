import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsDate,
  IsOptional,
  IsString,
} from "class-validator";

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
}
