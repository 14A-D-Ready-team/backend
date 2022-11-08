import { RegistrationDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { User, UserService } from "@/user";
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async signUp(registrationDto: RegistrationDto): Promise<User> {
    return this.userService.create(registrationDto);
  }
}
