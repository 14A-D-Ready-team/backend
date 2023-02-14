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
  EmailNotFoundException,
  InactiveUserException,
  InvalidLoginException,
  InvalidTokenException,
  PasswordNotSetException,
} from "./exceptions";
import { EmailDto } from "./dto";
import { InvalidPasswordException } from "./exceptions/invalid-password-exception";
import { EmailDuplicateException } from "@/user/duplicate-email.exeption";
import { InvalidIdException } from "@/shared/exceptions";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  @ApiResponse({ status: 200, type: User })
  @BadRequestResponse(
    InvalidDataException,
    PasswordNotSetException,
    EmailNotFoundException,
    InvalidPasswordException,
    EmailDuplicateException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
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
  @ApiResponse({ status: 200, type: User })
  @BadRequestResponse(
    InvalidDataException,
    InactiveUserException,
    InvalidLoginException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @Auth()
  public async sessionSignIn(@InjectAuthState() authState: AuthState) {
    return authState.user;
  }

  @Post("/logout")
  @ApiResponse({ status: 200 })
  @BadRequestResponse(
    InvalidDataException,
    InvalidLoginException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @Auth()
  public async logout(@InjectAuthState() authState: AuthState) {
    await authState.logout();
  }

  @Post("/send-email-verification")
  @ApiResponse({ status: 200 })
  @BadRequestResponse(
    EmailNotFoundException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public async sendConfirmEmail(@Body() email: EmailDto) {
    return this.authService.sendConfirmEmail(email);
  }

  @Post("/send-password-reset")
  @ApiResponse({ status: 200 })
  @BadRequestResponse(
    EmailNotFoundException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public async sendPasswordResetEmail(@Body() email: EmailDto) {
    return this.authService.sendPasswordResetEmail(email);
  }

  @Post("/verify-user/:tokenId")
  @ApiResponse({ status: 200, type: User })
  @BadRequestResponse(
    InvalidDataException,
    InvalidTokenException,
    InvalidIdException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public async verifyUser(@Param("tokenId") tokenId: string) {
    return this.authService.verifyUser(tokenId);
  }

  @Post("/change-user-password/:tokenId")
  @ApiResponse({ status: 200, type: User })
  @BadRequestResponse(
    InvalidDataException,
    InvalidTokenException,
    InvalidIdException,
  )
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
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
