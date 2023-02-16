import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, MinLength, MaxLength, IsNumber, Min } from "class-validator";

export class CreateBuffetDto {
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
  @MaxLength(100)
  public coords: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public address: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  public hours: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(800)
  public description: string;
}
