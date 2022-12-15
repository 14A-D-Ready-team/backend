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
  public location: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public address: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(15)
  public hours: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  public description: string;

  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public ownerId: number;
}
