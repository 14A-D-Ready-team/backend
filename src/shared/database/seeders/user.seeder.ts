import { UserStatus, UserType } from "@/user/enum";
import {
  Admin,
  BuffetOwner,
  BuffetWorker,
  Customer,
  User,
} from "@/user/entity";
import {
  EntityManager,
  IDatabaseDriver,
  Connection,
  Dictionary,
  Reference,
} from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { hash } from "argon2";
import { UserFactory } from "../factories";

type UserData = Partial<User>;

export class UserSeeder extends Seeder {
  public async run(
    em: EntityManager<IDatabaseDriver<Connection>>,
    context?: Dictionary<any> | undefined,
  ): Promise<void> {
    const factory = new UserFactory(em);

    const userData: UserData[] = [
      {
        name: "Fekete Miklós",
        email: "redstone12@gmail.com",
        password: await hash("Supa$3cr3t!!!"),
        admin: Reference.create(new Admin()),
        type: UserType.Admin,
        status: UserStatus.Active,
      },
      {
        name: "Sulyok Dávid",
        email: "sulyok.david@students.jedlik.eu",
        password: await hash("Supa$3cr3t!!!"),
        admin: Reference.create(new Admin()),
        type: UserType.Admin,
        status: UserStatus.Active,
      },
      {
        name: "Kékesi Ádám",
        email: "kekesi.adam@students.jedlik.eu",
        password: await hash("Supa$3cr3t!!!"),
        admin: Reference.create(new Admin()),
        type: UserType.Admin,
        status: UserStatus.Active,
      },
      {
        name: "Cserepes Virág",
        email: "flower123@gmail.com",
        password: await hash("Jelszo123$!"),
        buffetWorker: Reference.create(new BuffetWorker()),
        type: UserType.BuffetWorker,
        status: UserStatus.Active,
      },
      {
        name: "Végh Béla",
        email: "bela123@gmail.com",
        password: await hash("Jelszo123$!"),
        buffetOwner: Reference.create(new BuffetOwner()),
        type: UserType.BuffetOwner,
        status: UserStatus.Active,
      },
      {
        name: "Moe Lester",
        email: "moe.lester@gmail.com",
        password: await hash("Jelszo123$!"),
        customer: Reference.create(new Customer()),
        type: UserType.Customer,
        status: UserStatus.Active,
      },
      ...factory.make(20, {
        customer: Reference.create(new Customer()),
        password: await hash("Jelszo123$!"),
      }),
    ];

    const users = userData.map(u => {});
  }
}
