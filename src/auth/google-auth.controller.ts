import { Body, Controller, Post } from "@nestjs/common";
import VerifyGoogleAuthDto from "./dto/verify-google-auth.dto";
import { GoogleAuthService } from "./google-auth.service";

@Controller("google-auth")
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post("/verify")
  public async verifyToken(@Body() payload: VerifyGoogleAuthDto) {
    return this.googleAuthService.verifyToken(payload.token);
  }
}
