import {
  EmailNotFoundException,
  InvalidLoginException,
  PasswordNotSetException,
  InactiveUserException,
  InvalidTokenException,
} from "./exceptions";
import { LoginDto } from "./dto";
import { RegistrationDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { User, UserService, UserStatus } from "@/user";
import { BaseRepository } from "@/shared/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import * as argon2 from "argon2";
import { EmailService } from "@/shared/email";
import { Token, TokenService } from "@/token";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private tokenService: TokenService,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>,

    @InjectRepository(Token)
    private tokenRepository: BaseRepository<Token>,
  ) {}

  public async signUp(registrationDto: RegistrationDto): Promise<User> {
    const createdUser = await this.userService.create(registrationDto);
    //await this.emailService.sendTestEmail(registrationDto.email);

    //TODO send welcome and email confirm email
    //await this.emailService.sendWelcomeEmail(registrationDto.email);

    const token = await this.tokenService.createEmailConfirmToken(createdUser);
    console.log(token);

    //Uncomment when can send
    //await this.emailService.sendEmailConfirm(createdUser?.email, token.id);

    return createdUser;
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

  public async sendConfirmEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (user) {
      const token = await this.tokenService.createEmailConfirmToken(user);
      this.emailService.sendEmailConfirm(user?.email, token.id);
    }
  }

  public async verifyUser(tokenId: string) {
    const token = await this.tokenRepository.findOne(
      { id: tokenId },
      { populate: ["user"] },
    );

    if (token) {
      const user = this.userRepository.find(token.user);
      user.status = UserStatus.Active;
      console.log(user);
      await this.userRepository.persistAndFlush(user);
    } else {
      throw new InvalidTokenException();
    }
  }
}
