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

export class BuffetWorkerSeeder extends Seeder {
  public async run(
    em: EntityManager<IDatabaseDriver<Connection>>,
    context: SeederContext,
  ): Promise<void> {
    const factory = new UserFactory(em);

    const workerData: UserData[] = [
      {
        name: "Cserepes Virág",
        email: "flower123@gmail.com",
        password: await hash("Jelszo123$!"),
        buffetWorker: Reference.create(
          new BuffetWorker(context.buffets["Sörkert"]),
        ),
        type: UserType.BuffetWorker,
        status: UserStatus.Active,
      },
      {
        name: "Hanna",
        email: "hanna@jedlik.eu",
        password: await hash("Jelszo123$!"),
        buffetWorker: Reference.create(
          new BuffetWorker(context.buffets["Jedlik büfé"]),
        ),
        type: UserType.BuffetWorker,
        status: UserStatus.Active,
      },
    ];

    const users: User[] = [];

    for (const u of workerData) {
      const user = factory.makeOne(u);
      users.push(user);
    }

    await em.persistAndFlush(users);
  }
}
