import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import TestDto from "./test.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private pipe: ValidationPipe,
  ) {}

  @Get()
  public test(@Query() query: TestDto) {}

  @Post()
  public test2(@Body() body: TestDto) {
    console.log(body);
  }
}
