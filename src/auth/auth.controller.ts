import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, Param, Post, Session } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { Auth, InjectAuthState } from "./decorator";
import { AuthState } from "./auth.state";
import { CheckNewPassword } from "../token/check-new-password";
import * as argon2 from "argon2";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  public async signUp(@Body() registrationDto: RegistrationDto) {
    return this.authService.signUp(registrationDto);
  }

  @Post("/signin")
  public async signIn(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signIn(loginDto);
    session.userId = user.id;
    return user;
  }

  @Post("/session-signin")
  @Auth()
  public async sessionSignIn(@InjectAuthState() authState: AuthState) {
    return authState.user;
  }

  @Post("/logout")
  @Auth()
  public async logout(@InjectAuthState() authState: AuthState) {
    await authState.logout();
  }

  @Post("/send-email-verification")
  public async sendConfirmEmail(@Body() email: string) {
    return this.authService.sendConfirmEmail(email);
  }

  @Post("/verify-user/:tokenId")
  public async verifyUser(@Param("tokenId") tokenId: string) {
    return this.authService.verifyUser(tokenId);
  }

  @Post("/change-user-password/:tokenId/:newPassword")
  public async changeUserPassword(
    @Param("tokenId") tokenId: string,
    @Param("newPassword") newPassword: string,
  ) {
    const checkNewPassword = new CheckNewPassword();

    await checkNewPassword.CheckPwd(newPassword);

    const secretNewPassword = await argon2.hash(newPassword);

    return this.authService.changeUserPassword(tokenId, secretNewPassword);
  }
}
