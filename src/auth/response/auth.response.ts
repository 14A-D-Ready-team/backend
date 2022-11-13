import { Token } from "@/token";
import { User } from "@/user";
import { Expose, Transform } from "class-transformer";

export default class AuthResponse {
  @Expose()
  public user: User;

  @Expose()
  @Transform(({ value }) => (value as Token).id)
  public token: Token;

  constructor(user: User, token: Token) {
    this.user = user;
    this.token = token;
  }
}
