import { ArgumentMetadata } from "@nestjs/common";
import { Expose, Type } from "class-transformer";
import { CustomValidationPipe } from "./custom-validation.pipe";

class Nested {
  @Expose()
  public nestedprop1: string;
}

class Test1 {
  @Expose()
  public a: string;

  @Expose()
  public b: number;

  @Expose()
  @Type(() => Number)
  public c: number[];

  @Expose()
  public d: Nested;
}

describe("CustomValidationPipe", () => {
  const pipe = new CustomValidationPipe();
  it("should be defined", () => {
    expect(new CustomValidationPipe()).toBeDefined();
  });

  it("should deserialize object body with primitives, an array, and a nested object", async () => {
    const value = {
      a: "a",
      b: 1,
      c: [1, 2, 3],
      d: { nestedprop1: "nestedprop1" },
    };
    const meta: ArgumentMetadata = { data: "", metatype: Test1, type: "body" };

    const result = await pipe.transform(value, meta);
    runChecks(result);
  });

  it("should deserialize query", async () => {
    const value = {
      a: "a",
      b: "1",
      c: "[1, 2, 3]",
      d: '{ "nestedprop1": "nestedprop1" }',
    };
    const meta: ArgumentMetadata = { data: "", metatype: Test1, type: "query" };

    const result = await pipe.transform(value, meta);
    runChecks(result);
  });
});

function runChecks(result: Test1) {
  expect(result).toBeInstanceOf(Test1);
  expect(result.a).toBe("a");
  expect(result.b).toBe(1);
  expect(result.c).toEqual([1, 2, 3]);
  expect(result.d).toBeInstanceOf(Nested);
  expect(result.d.nestedprop1).toBe("nestedprop1");
}
