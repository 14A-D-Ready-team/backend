import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from "./../user/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto)
  }
}
