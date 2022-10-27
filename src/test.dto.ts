import { Transform, Type, plainToInstance, Expose } from "class-transformer";
import { Contains } from "class-validator";

class TestAsd {
  public a: number;
}

export default class TestDto {
  @Expose()
  public arr: string[];

  @Expose()
  public obj: TestAsd;

  @Expose()
  public a: string;
}
