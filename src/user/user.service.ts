import { Injectable } from "@nestjs/common";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "./entity";
import { UserData } from "./user-data.interface";
import * as argon2 from "argon2";
import { UserStatus, UserType } from "./enum";
import { InjectRepository } from "@mikro-orm/nestjs";
import { BaseRepository } from "@shared/database";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: BaseRepository<User>,

    @InjectRepository(Admin)
    private adminRepository: BaseRepository<Admin>,

    @InjectRepository(Customer)
    private customerRepository: BaseRepository<Customer>,

    @InjectRepository(BuffetWorker)
    private buffetWorkerRepository: BaseRepository<BuffetWorker>,

    @InjectRepository(BuffetOwner)
    private buffetOwnerRepository: BaseRepository<BuffetOwner>,
  ) {}

  public async create(userData: UserData): Promise<User> {
    const { name, email, password, type } = userData;

    const secretPassword = password ? await argon2.hash(password) : undefined;

    const user = this.userRepository.create({
      name,
      email,
      password: secretPassword,
      type,
      status: UserStatus.Inactive,
    });

    await this.userRepository.persistAndFlush(user);

    if (user.type === UserType.Admin) {
      const admin = this.adminRepository.create({
        user,
      });
      this.adminRepository.persistAndFlush(admin);
    }

    if (user.type === UserType.Customer) {
      const customer = this.customerRepository.create({
        user,
      });
      this.customerRepository.persistAndFlush(customer);
    }

    if (user.type === UserType.BuffetOwner) {
      const buffetOwner = this.buffetOwnerRepository.create({
        user,
      });
      this.buffetOwnerRepository.persistAndFlush(buffetOwner);
    }

    if (user.type === UserType.BuffetWorker) {
      const bufferWorker = this.buffetWorkerRepository.create({
        user,
      });
      this.buffetWorkerRepository.persistAndFlush(bufferWorker);
    }

    return user;
  }
}
