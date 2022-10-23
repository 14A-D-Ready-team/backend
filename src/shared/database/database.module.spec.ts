import { DatabaseModule } from "./database.module";
import { MikroORM } from "@mikro-orm/core";
import { Test } from "@nestjs/testing";
import DatabaseService from "./database.service";

describe("DatabaseService", () => {
  let dbService: DatabaseService;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    dbService = module.get<DatabaseService>(DatabaseService);
    orm = module.get<MikroORM>(MikroORM);
  });

  it("should be defined", () => {
    expect(dbService).toBeDefined();
    expect(orm).toBeDefined();
  });
});
