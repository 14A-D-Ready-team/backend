import { RegistrationDto } from "./dto";
import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User, UserService } from "@/user";
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async signUp(registrationDto: RegistrationDto): Promise<User> {
    try {
      await this.userService.create(registrationDto);
    } catch (error) {
      if (
        error.code === "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("user_email_unique")
      ) {
        //error.message = "Email already belongs to an account!";
        //return error.message;
        //console.log(error);

        throw new InternalServerErrorException('Email already belongs to an account!').message;
      }
    }

    return this.userService.create(registrationDto);
  }
}
