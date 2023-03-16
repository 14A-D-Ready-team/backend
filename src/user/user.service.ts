import { Injectable } from "@nestjs/common";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "./entity";
import { UserData } from "./user-data.interface";
import * as argon2 from "argon2";
import { UserStatus, UserType } from "./enum";
import { InjectRepository } from "@mikro-orm/nestjs";
import { BaseRepository } from "@shared/database";
import { EmailDuplicateException } from "./duplicate-email.exeption";
import { RegistrationDto } from "@/auth/dto";
import { Buffet, BuffetInviteToken } from "@/buffet/entity";
import { Reference } from "@mikro-orm/core";
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

    @InjectRepository(BuffetInviteToken)
    private buffetInviteRepository: BaseRepository<BuffetInviteToken>,
  ) {}

  public async create(userData: UserData, token: string): Promise<User> {
    const user = await this.createUser(userData);

    if (user.type === UserType.BuffetWorker) {
      await this.createBuffetWorker(user, token);
    } else {
      await this.createRest(user);
    }

    return user;
  }

  private async createUser(userData: UserData): Promise<User> {
    const { name, email, password, type } = userData;

    const secretPassword = password ? await argon2.hash(password) : undefined;

    const user = this.userRepository.create({
      name,
      email,
      password: secretPassword,
      type,
      status: UserStatus.Inactive,
    });

    try {
      await this.userRepository.persistAndFlush(user);
    } catch (error) {
      if (
        error.code === "ER_DUP_ENTRY" &&
        error.sqlMessage.includes("user_email_unique")
      ) {
        throw new EmailDuplicateException();
      } else {
        throw error;
      }
    }

    return user;
  }

  private async createBuffetWorker(user: User, token: string) {
    const inviteToken = await this.buffetInviteRepository.findOne(token);

    if (inviteToken === null) {
      throw Error("Ilyen token nem létezik!");
    }

    if (user.type === UserType.BuffetWorker) {
      const bufferWorker = this.buffetWorkerRepository.create({
        user,
        buffet: Reference.create(inviteToken.buffet),
      });
      await this.buffetWorkerRepository.persistAndFlush(bufferWorker);
    }
  }

  private async createRest(user: User) {
    if (user.type === UserType.Admin) {
      const admin = this.adminRepository.create({
        user,
      });
      await this.adminRepository.persistAndFlush(admin);
    }

    if (user.type === UserType.Customer) {
      const customer = this.customerRepository.create({
        user,
      });
      await this.customerRepository.persistAndFlush(customer);
    }

    if (user.type === UserType.BuffetOwner) {
      const buffetOwner = this.buffetOwnerRepository.create({
        user,
      });
      this.buffetOwnerRepository.persistAndFlush(buffetOwner);
    }
  }
}
