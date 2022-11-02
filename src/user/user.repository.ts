import { AuthCredentialsDto } from "./../auth/dto/auth-credentials.dto";
import { EntityRepository } from "@mikro-orm/mysql";
import { UserStatus, UserType } from "src/user/enum";
import User from "./entity/user.entity";

export class UserRepository extends EntityRepository<User> {
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
    const user = this.create({
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
    await this.flush();
  }
}
