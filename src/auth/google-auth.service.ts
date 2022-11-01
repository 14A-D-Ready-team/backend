import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import authConfig from "./auth.config";

@Injectable()
export class GoogleAuthService {
  constructor(
    @Inject(authConfig.KEY)
    private dbConfig: ConfigType<typeof authConfig>,
  ) {}

  public async verifyToken(token: string) {
    const client = new OAuth2Client({
      clientId: this.dbConfig.googleClientId,
      clientSecret: this.dbConfig.googleClientSecret,
    });
    const result = await client.verifyIdToken({ idToken: token });
  }
}
