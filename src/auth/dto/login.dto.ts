import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @Expose()
  @IsString()
  public email!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public password!: string;
}
