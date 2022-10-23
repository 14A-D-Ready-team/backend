import { MikroORM } from "@mikro-orm/core";
import { Test, TestingModule } from "@nestjs/testing";
import DatabaseService from "./database.service";

describe("DatabaseService", () => {
  let service1: DatabaseService;
  let service2: DatabaseService;

  beforeEach(async () => {
    const module1: TestingModule = await createTestingModule({
      get: jest.fn().mockImplementation((key: string) => {
        if (key === "dbName") {
          return "test";
        }
      }),
    });

    const module2: TestingModule = await createTestingModule({
      get: jest.fn().mockImplementation(() => undefined),
    });

    service1 = module1.get<DatabaseService>(DatabaseService);
    service2 = module2.get<DatabaseService>(DatabaseService);
  });

  it("should be defined", () => {
    expect(service1).toBeDefined();
    expect(service2).toBeDefined();
  });

  it("Testing rebuildDbSchema", async () => {
    await service1.rebuildDbSchema();
  });

  it("Testing rebuildDbSchema, throws error when dbName is not in config", async () => {
    expect(service2.rebuildDbSchema()).rejects.toThrow(
      "dbName is not defined in database config",
    );
  });
});

function createTestingModule(config: { get: (key: string) => unknown }) {
  return Test.createTestingModule({
    providers: [
      DatabaseService,
      {
        provide: MikroORM,
        useValue: {
          config,
          getSchemaGenerator() {
            return {
              dropDatabase: jest.fn(),
              createDatabase: jest.fn(),
              createSchema: jest.fn(),
            };
          },
        },
      },
    ],
  }).compile();
}
