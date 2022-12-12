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

    const emailConfirmToken = await this.tokenService.createEmailConfirmToken(
      createdUser,
    );

    //Uncomment when can send
    //await this.emailService.sendWelcomeEmail(createdUser, emailConfirmToken.id);

    return createdUser;
  }

  public async signIn(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ email: loginDto.email });

    if (!user) {
      throw new InvalidLoginException();
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
      this.emailService.sendConfirmEmail(user, token.id);
    }
  }

  public async sendPasswordResetEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (user) {
      const token = await this.tokenService.createPasswordResetToken(user);
      this.emailService.sendPwdResetEmail(user, token.id);
    }
  }

  public async verifyUser(tokenId: string) {
    const token = await this.tokenRepository.findOne(
      { id: tokenId },
      { populate: ["user"] },
    );

    if (token) {
      const user = token.user.getEntity();
      user.status = UserStatus.Active;
      await this.userRepository.persistAndFlush(user);
    } else {
      throw new InvalidTokenException();
    }
  }

  public async changeUserPassword(tokenId: string, newPassword: string) {
    const token = await this.tokenRepository.findOne(
      { id: tokenId },
      { populate: ["user"] },
    );

    if (token) {
      const user = token.user.getEntity();
      user.password = await argon2.hash(newPassword);
      await this.userRepository.persistAndFlush(user);
    } else {
      throw new InvalidTokenException();
    }
  }
}
