import { Injectable, NotImplementedException } from "@nestjs/common";
import { Token } from "./token.entity";
import { User } from "@/user";

@Injectable()
export class TokenService {
  public async createAuthToken(user: User): Promise<Token> {
    throw new NotImplementedException();
  }
}
