import { Controller, Get } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { AppService } from "./app.service";

class Test {
  @Expose()
  @Transform(({ value }) => value + "classtransformer")
  public a: string;
  constructor(a: string) {
    this.a = a;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  public test() {
    return new Test("sdasadsad");
  }
}
