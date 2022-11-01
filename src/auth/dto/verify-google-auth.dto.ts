import { Expose } from "class-transformer";
import { IsJWT, IsString } from "class-validator";

export default class VerifyGoogleAuthDto {
  @Expose()
  @IsString()
  @IsJWT()
  public token: string;
}
