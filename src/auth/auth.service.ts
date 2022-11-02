import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";

@Injectable()
export class AuthService {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //return this.userRepository.createUser(authCredentialsDto);
  }
}
