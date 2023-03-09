import { Controller, Get, HttpCode, Session } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { AppService } from "./app.service";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @HttpCode(200)
  public healthCheck() {}
}
