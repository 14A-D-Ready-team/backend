import { Test } from "@nestjs/testing";
import { sessionConfig } from "./session.config";
import { SessionMiddleware } from "./session.middleware";

describe("SessionMiddleware", () => {
  let middleware: SessionMiddleware;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SessionMiddleware,
        {
          provide: sessionConfig.KEY,
          useValue: {
            secret: "secret",
            cookie: {
              secure: false,
            },
            name: "name",
          },
        },
      ],
    }).compile();

    middleware = module.get<SessionMiddleware>(SessionMiddleware);
  });

  it("should be defined", () => {
    expect(middleware).toBeDefined();
  });
});
