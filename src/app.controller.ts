import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Type } from "class-transformer";
import { AppService } from "./app.service";
import TestDto from "./test.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public test(@Query() query: TestDto) {
    console.log(query);
  }

  @Post()
  public test2(
    @Body()
    body: TestDto,
  ) {
    console.log(body);
  }
}
