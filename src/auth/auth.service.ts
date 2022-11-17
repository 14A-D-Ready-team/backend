import {
  EmailNotFoundException,
  InvalidLoginException,
  PasswordNotSetException,
  InactiveUserException,
} from "./exceptions";
import { LoginDto } from "./dto";
import { RegistrationDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { User, UserService, UserStatus } from "@/user";
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

    if (user.status === UserStatus.Inactive) {
      throw new InactiveUserException();
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
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      return null;
    }

    if (user.status === UserStatus.Inactive) {
      throw new InactiveUserException();
    }

    return user;
  }
}
