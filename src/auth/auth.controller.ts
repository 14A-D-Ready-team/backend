import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, Post, Session } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { Auth, InjectAuthState } from "./decorator";
import { AuthState } from "./auth.state";
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
}
