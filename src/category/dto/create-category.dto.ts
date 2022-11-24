import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @Expose()
  @ApiProperty()
  @IsString()
  public name: string;
}
