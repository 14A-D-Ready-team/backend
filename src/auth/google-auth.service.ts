/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
  GoogleAuthFailedException,
  InvalidUserTypeException,
  MissingScopesException,
} from "./exceptions";
import { User, UserService, UserStatus, UserType } from "@/user";
import { authConfig } from "./auth.config";
import { BaseRepository } from "@shared/database";

interface GoogleUserData {
  email: string;
  givenName: string;
  familyName: string;
}

@Injectable()
export class GoogleAuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>,

    private userService: UserService,
  ) {}

  public async verify(token: string) {
    const client = new OAuth2Client({
      clientId: this.config.googleClientId,
      clientSecret: this.config.googleClientSecret,
    });

    let result: LoginTicket;
    try {
      result = await client.verifyIdToken({ idToken: token });
    } catch (error) {
      throw new GoogleAuthFailedException();
    }

    const googleUserData = this.processTicketPayload(result.getPayload());
    const user = await this.userRepository.findOne({
      email: googleUserData.email,
    });

    if (user) {
      return this.authenticateUser(user);
    }

    return this.registerNewUser(googleUserData);
  }

  private processTicketPayload(
    payload: TokenPayload | undefined,
  ): GoogleUserData {
    if (!payload) {
      throw new GoogleAuthFailedException();
    }

    const missingScopes: string[] = [];

    if (!payload.email) {
      missingScopes.push("email");
    }

    if (!payload.family_name || !payload.given_name) {
      missingScopes.push("profile");
    }

    if (missingScopes.length > 0) {
      throw new MissingScopesException(missingScopes);
    }

    return {
      email: payload.email!,
      givenName: payload.given_name!,
      familyName: payload.family_name!,
    };
  }

  private async authenticateUser(user: User) {
    if (user.type !== UserType.Customer) {
      throw new InvalidUserTypeException();
    }

    return user;
  }

  private async registerNewUser(userData: GoogleUserData) {
    const newUser = await this.userService.create(
      {
        email: userData.email,
        name: userData.givenName + " " + userData.familyName,
        type: UserType.Customer,
        status: UserStatus.Active,
      },
      "",
    );

    return newUser;
  }
}
