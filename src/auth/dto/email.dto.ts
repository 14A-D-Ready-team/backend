import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class EmailDto {
  @ApiProperty()
  @Expose()
  @IsString()
  public email!: string;
}
