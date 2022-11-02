import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
  GoogleAuthFailedException,
  InvalidUserTypeException,
  MissingScopesException,
} from "./exceptions";
import { User, UserType } from "@/user";
import { authConfig } from "./auth.config";
import { BaseRepository } from "@shared/database";
import { TokenService } from "@/token";

interface GoogleUserData {
  email: string | undefined;
  givenName: string | undefined;
  familyName: string | undefined;
}

@Injectable()
export class GoogleAuthService {
  constructor(
    @Inject(authConfig.KEY)
    private dbConfig: ConfigType<typeof authConfig>,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>,

    private tokenService: TokenService,
  ) {}

  public async verify(token: string, userType: UserType) {
    const client = new OAuth2Client({
      clientId: this.dbConfig.googleClientId,
      clientSecret: this.dbConfig.googleClientSecret,
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
      return this.authenticateUser(user, userType);
    }

    return this.registerNewUser(googleUserData, userType);
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
      email: payload.email,
      givenName: payload.given_name,
      familyName: payload.family_name,
    };
  }

  private async authenticateUser(user: User, userType: UserType) {
    if (user.type !== userType) {
      throw new InvalidUserTypeException();
    }

    const token = await this.tokenService.createAuthToken(user);
    return { user, token };
  }

  private async registerNewUser(userData: GoogleUserData, userType: UserType) {}
}
