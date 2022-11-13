import { Body, Controller, Post, Session } from "@nestjs/common";
import { VerifyGoogleAuthDto } from "./dto";
import { GoogleAuthService } from "./google-auth.service";

@Controller("auth/google")
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post("/verify")
  public async verify(
    @Body() payload: VerifyGoogleAuthDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.googleAuthService.verify(
      payload.token,
      payload.userType,
    );
    session.userId = user.id;
    return user;
  }
}
