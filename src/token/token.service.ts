import { Injectable, NotImplementedException } from "@nestjs/common";
import { User } from "src/user/entity";
import Token from "./token.entity";

@Injectable()
export class TokenService {
  public async createAuthToken(user: User): Promise<Token> {
    throw new NotImplementedException();
  }
}
