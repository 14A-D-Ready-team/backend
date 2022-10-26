import { Transform, Type, plainToInstance } from "class-transformer";
import { Contains } from "class-validator";

class TestAsd {
  public a: number;
}

export default class TestDto {
  @Transform(x => {
    console.log(x);
    return JSON.parse(x.value);
  })
  @Contains("test", { each: true })
  public arr: string[];

  @Transform(x => {
    console.log(x);
    return plainToInstance(TestAsd, JSON.parse(x.value));
  })
  public obj: TestAsd;

  public a: string;
}
