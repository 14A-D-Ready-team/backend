import { UserType } from "@/user";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from "class-validator/types/decorator/decorators";

export class RegistrationDto {

  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name!: string;

  @Expose()
  @IsString()
  @IsEmail()
  public email!: string;

  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  public password!: string;

  @Expose()
  @IsEnum(UserType)
  public type!: UserType;
}
