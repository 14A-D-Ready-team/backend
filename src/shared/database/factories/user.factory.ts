import { UserStatus, UserType } from "@/user/enum";
import { User } from "@/user/entity";
import { Factory, Faker } from "@mikro-orm/seeder";
import { v1 } from "uuid";

export class UserFactory extends Factory<User> {
  public model = User;

  public definition(faker: Faker): Partial<User> {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
      name: firstName + " " + lastName,
      email: faker.internet.email(firstName, lastName + v1()),
      type: UserType.Customer,
      status: faker.helpers.arrayElement([
        UserStatus.Active,
        UserStatus.Inactive,
      ]),
    };
  }
}
