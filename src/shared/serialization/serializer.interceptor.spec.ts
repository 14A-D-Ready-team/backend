import { ExecutionContext, CallHandler } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { SerializerInterceptor } from "./serializer.interceptor";
import { createMock } from "@golevelup/ts-jest";
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";

describe("SerializerInterceptor", () => {
  let interceptor: SerializerInterceptor;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerializerInterceptor],
    }).compile();

    interceptor = module.get(SerializerInterceptor);
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  it("should wrap API responses", () => {
    const ctx = createMock<ExecutionContext>();
    const handler = createMock<CallHandler>({
      handle: jest.fn().mockReturnValue(of({ testProp: "b" })),
    });

    const testScheduler = new TestScheduler((actual, expected) => {
      return expect(actual).toEqual(expected);
    });

    const expectedMarbles = "(a|)";
    const expectedValues = {
      a: { data: { testProp: "b" } },
    };

    testScheduler.run(({ expectObservable }) => {
      const result = interceptor.intercept(ctx, handler);
      expectObservable(result).toBe(expectedMarbles, expectedValues);
    });
  });
});
