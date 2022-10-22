import { MikroORM } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/mysql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import BaseRepository from "./shared/database/base.repository";
import TestEntity from "./test/test.entity";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    private orm: MikroORM,

    @InjectRepository(TestEntity)
    private repository: BaseRepository<TestEntity>,
  ) {}

  @Get()
  public async a() {
    try {
      await this.repository.persistAndFlush(new TestEntity());
    } catch (error) {
      console.log(error);
    }
  }
}
