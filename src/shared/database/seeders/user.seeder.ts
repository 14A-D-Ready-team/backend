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
import { v1 } from "uuid";
import { SeederContext } from "../utils";

type UserData = Partial<User>;

export class UserSeeder extends Seeder {
  public async run(
    em: EntityManager<IDatabaseDriver<Connection>>,
    context: SeederContext,
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
        name: "Nagy Béla",
        email: "bela123@gmail.com",
        password: await hash("Jelszo123$!"),
        buffetOwner: Reference.create(new BuffetOwner()),
        type: UserType.BuffetOwner,
        status: UserStatus.Active,
      },
      {
        name: "Kis Johnny",
        email: "johnny123@gmail.com",
        password: await hash("Jelszo123$!"),
        buffetOwner: Reference.create(new BuffetOwner()),
        type: UserType.BuffetOwner,
        status: UserStatus.Active,
      },
      {
        name: "Vicc Elek",
        email: "elek@gmail.com",
        password: await hash("Jelszo123$!"),
        customer: Reference.create(new Customer()),
        type: UserType.Customer,
        status: UserStatus.Active,
      },
    ];

    const users: User[] = [];

    for (const u of userData) {
      const user = factory.makeOne(u);
      users.push(user);
    }

    for (let i = 0; i < 50; i++) {
      const passwordHash = await hash("Jelszo123$!");
      users.push(
        factory.makeOne({
          customer: Reference.create(new Customer()),
          password: passwordHash,
        }),
      );
    }

    await em.persistAndFlush(users);

    for (const u of users) {
      if (u.type === UserType.BuffetOwner) {
        context.buffetOwners = {
          ...context.buffetOwners,
          [u.name]: u,
        };
      }
    }
  }
}
