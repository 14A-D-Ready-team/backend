import { UserType } from "@/user/enum";
import { Expose } from "class-transformer";
import { IsEnum, IsJWT, IsString } from "class-validator";

export class VerifyGoogleAuthDto {
  @Expose()
  @IsString()
  @IsJWT()
  public token: string;
}
