import { Body, Controller, Post } from "@nestjs/common";
import { VerifyGoogleAuthDto } from "./dto";
import { GoogleAuthService } from "./google-auth.service";

@Controller("auth/google")
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post("/verify")
  public async verify(@Body() payload: VerifyGoogleAuthDto) {
    return this.googleAuthService.verify(payload.token, payload.userType);
  }
}
