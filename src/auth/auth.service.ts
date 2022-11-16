import {
  EmailNotFoundException,
  InvalidLoginException,
  PasswordNotSetException,
} from "./exceptions";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto";
import { Injectable, NotImplementedException } from "@nestjs/common";
import { User, UserService } from "@/user";
import { BaseRepository } from "@/shared/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>,
  ) {}

  public async signUp(registrationDto: RegistrationDto): Promise<User> {
    return this.userService.create(registrationDto);
  }

  public async signIn(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ email: loginDto.email });

    if (!user) {
      throw new EmailNotFoundException();
    }

    if (!user.password) {
      throw new PasswordNotSetException();
    }

    if (await argon2.verify(user.password, loginDto.password)) {
      // password match
      return user;
    } else {
      // password did not match
      throw new InvalidLoginException();
    }
  }

  public async sessionLogin(userId: number): Promise<User | null> {
    throw new NotImplementedException();
  }
}
