import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import TestDto from "./test.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public test(@Query(new ValidationPipe({ transform: true })) query: TestDto) {}

  @Post()
  public test2(@Body(new ValidationPipe({ transform: true })) body: TestDto) {
    console.log(body.constructor.name);
  }
}
