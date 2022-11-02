import { UserType } from "./../../user/enum/user-type.enum";
import { Expose } from "class-transformer";
import { IsEnum, IsJWT, IsString } from "class-validator";

export default class VerifyGoogleAuthDto {
  @Expose()
  @IsString()
  @IsJWT()
  public token: string;

  @Expose()
  @IsEnum(UserType)
  public userType: UserType;
}
