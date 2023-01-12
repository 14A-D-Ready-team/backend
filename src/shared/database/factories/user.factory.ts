import { UserStatus, UserType } from "@/user/enum";
import { User } from "@/user/entity";
import { Factory, Faker } from "@mikro-orm/seeder";

export class UserFactory extends Factory<User> {
  public model = User;

  public definition(faker: Faker): Partial<User> {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
      name: firstName + " " + lastName,
      email: faker.internet.email(),
      type: UserType.Customer,
      status: faker.helpers.arrayElement([
        UserStatus.Active,
        UserStatus.Inactive,
      ]),
    };
  }
}
