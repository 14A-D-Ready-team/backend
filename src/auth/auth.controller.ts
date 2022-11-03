import { AuthService } from "./auth.service";
import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() registrationDto: RegistrationDto) {
    return this.authService.signUp(registrationDto);
  }
}
