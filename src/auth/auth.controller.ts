import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, Param, Post, Session } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { Auth, InjectAuthState } from "./decorator";
import { AuthState } from "./auth.state";
import * as argon2 from "argon2";
import { NewPasswordDto } from "@/auth/dto/new-password.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@/user";
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  ServiceUnavailableResponse,
} from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation/exceptions";
import {
  InactiveUserException,
  InvalidLoginException,
  PasswordNotSetException,
} from "./exceptions";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  public async signUp(@Body() registrationDto: RegistrationDto) {
    return this.authService.signUp(registrationDto);
  }

  @Post("/signin")
  @ApiResponse({ status: 200, type: User })
  @BadRequestResponse(
    InvalidDataException,
    InvalidLoginException,
    PasswordNotSetException,
    InactiveUserException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
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

  @Post("/send-welcome-email")
  public async sendWelcomeEmail(@Body() email: string) {
    return this.authService.sendWelcomeEmail(email);
  }

  @Post("/send-email-verification")
  public async sendConfirmEmail(@Body() email: string) {
    return this.authService.sendConfirmEmail(email);
  }

  @Post("/send-password-reset")
  public async sendPasswordResetEmail(@Body() email: string) {
    return this.authService.sendPasswordResetEmail(email);
  }

  @Post("/verify-user/:tokenId")
  public async verifyUser(@Param("tokenId") tokenId: string) {
    return this.authService.verifyUser(tokenId);
  }

  @Post("/change-user-password/:tokenId")
  public async changeUserPassword(
    @Param("tokenId") tokenId: string,
    @Body() newPasswordDto: NewPasswordDto,
  ) {
    return this.authService.changeUserPassword(
      tokenId,
      newPasswordDto.password,
    );
  }
}
