import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import BaseRepository from "src/shared/database/base.repository";
import { User } from "./entity";
import { UserType, UserStatus } from "./enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: BaseRepository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {
      type,
      name,
      email,
      password,
      status,
      admin,
      customer,
      buffetWorker,
      buffetOwner,
    } = authCredentialsDto;

    //Exclude(admin, customer, buffetWorker, buffetOwner)
    const user = this.userRepository.create({
      name,
      email,
      password,
      type: UserType.Customer,
      status: UserStatus.Active,
      admin,
      customer,
      buffetWorker,
      buffetOwner,
    });
    await this.userRepository.persistAndFlush(user);
  }
}
