import { Buffet } from "@/buffet/entity/buffet.entity";
import { Factory, Faker } from "@mikro-orm/seeder";

export class BuffetFactory extends Factory<Buffet> {
  public model = Buffet;

  public definition(faker: Faker): Partial<Buffet> {
    const lat = faker.address.latitude();
    const long = faker.address.longitude();

    const hourFrom = faker.random.numeric();
    const hourTo = faker.random.numeric();

    return {
      name: faker.company.name(),
      coords: lat + ", " + long,
      address: faker.address.streetAddress(),
      hours: hourFrom + "-" + hourTo,
      description: faker.lorem.paragraph(),
    };
  }
}
