import { User } from "@/user";
import { Injectable, NotImplementedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  public async sessionLogin(userId: number): Promise<User | null> {
    throw new NotImplementedException();
  }
}
