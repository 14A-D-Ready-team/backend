import { Transform, Type, plainToInstance } from "class-transformer";
import { Contains } from "class-validator";

class TestAsd {
  public a: number;
}

export default class TestDto {
  public arr: string[];

  public obj: TestAsd;

  public a: string;
}
