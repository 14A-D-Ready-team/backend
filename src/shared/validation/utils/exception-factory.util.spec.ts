import { ValidationError } from "@nestjs/common";
import { InvalidDataException, InvalidProperty } from "../exceptions";
import { exceptionFactory } from "./exception-factory.util";

describe("validation/exceptionFactory", () => {
  it("should be able to build an exception from a single ValidationError without children", () => {
    const errors: ValidationError[] = [
      {
        property: "testprop1",
        constraints: { c1: "Errormessage 1", c2: "Errormessage 2" },
      },
    ];

    const result = exceptionFactory(errors);

    expect(result).toBeInstanceOf(InvalidDataException);
    expect(result.invalidProperties).toBeInstanceOf(Map);
    expect(result.invalidProperties.size).toBe(1);
    expect(result.invalidProperties.get("testprop1")).toBeInstanceOf(
      InvalidProperty,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(result.invalidProperties.get("testprop1")?.errorMessages.size).toBe(
      2,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c1"),
    ).toBe("Errormessage 1");
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c2"),
    ).toBe("Errormessage 2");

    expect(result.invalidProperties.get("testprop1")?.children).toBeInstanceOf(
      Map,
    );
    expect(result.invalidProperties.get("testprop1")?.children.size).toBe(0);
  });

  it("should be able to build an exception from a single ValidationError without any constraints", () => {
    const errors: ValidationError[] = [{ property: "testprop1" }];

    const result = exceptionFactory(errors);

    expect(result).toBeInstanceOf(InvalidDataException);
    expect(result.invalidProperties).toBeInstanceOf(Map);
    expect(result.invalidProperties.size).toBe(1);
    expect(result.invalidProperties.get("testprop1")).toBeInstanceOf(
      InvalidProperty,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(result.invalidProperties.get("testprop1")?.errorMessages.size).toBe(
      0,
    );
    expect(result.invalidProperties.get("testprop1")?.children).toBeInstanceOf(
      Map,
    );
    expect(result.invalidProperties.get("testprop1")?.children.size).toBe(0);
  });

  it("should be able to build an exception from a single ValidationError with children and more than 1 ", () => {
    const errors: ValidationError[] = [
      {
        property: "testprop1",
        constraints: { c1: "Errormessage 1", c2: "Errormessage 2" },
        children: [
          {
            property: "childprop1",
            constraints: { c3: "Errormessage 3" },
          },
          { property: "childprop2", constraints: { c4: "Errormessage 4" } },
        ],
      },
    ];

    const result = exceptionFactory(errors);

    expect(result).toBeInstanceOf(InvalidDataException);
    expect(result.invalidProperties).toBeInstanceOf(Map);
    expect(result.invalidProperties.size).toBe(1);
    expect(result.invalidProperties.get("testprop1")).toBeInstanceOf(
      InvalidProperty,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(result.invalidProperties.get("testprop1")?.errorMessages.size).toBe(
      2,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c1"),
    ).toBe("Errormessage 1");
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c2"),
    ).toBe("Errormessage 2");
    expect(result.invalidProperties.get("testprop1")?.children).toBeInstanceOf(
      Map,
    );
    expect(result.invalidProperties.get("testprop1")?.children.size).toBe(2);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop1"),
    ).toBeInstanceOf(InvalidProperty);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop1")
        ?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop1")
        ?.errorMessages.size,
    ).toBe(1);
    expect(
      result.invalidProperties
        .get("testprop1")
        ?.children.get("childprop1")
        ?.errorMessages.get("c3"),
    ).toBe("Errormessage 3");
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop1")
        ?.children,
    ).toBeInstanceOf(Map);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop1")
        ?.children.size,
    ).toBe(0);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop2"),
    ).toBeInstanceOf(InvalidProperty);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop2")
        ?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop2")
        ?.errorMessages.size,
    ).toBe(1);
    expect(
      result.invalidProperties
        .get("testprop1")
        ?.children.get("childprop2")
        ?.errorMessages.get("c4"),
    ).toBe("Errormessage 4");
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop2")
        ?.children,
    ).toBeInstanceOf(Map);
    expect(
      result.invalidProperties.get("testprop1")?.children.get("childprop2")
        ?.children.size,
    ).toBe(0);
  });

  it("should skip other constraints on an error if one constraint has skipOthers", () => {
    const errors: ValidationError[] = [
      {
        property: "testprop1",
        constraints: { c1: "Errormessage 1", c2: "Skipped", c3: "Skipped" },
        contexts: { c1: { skipOthers: true } },
      },
    ];

    const result = exceptionFactory(errors);

    expect(result).toBeInstanceOf(InvalidDataException);
    expect(result.invalidProperties).toBeInstanceOf(Map);
    expect(result.invalidProperties.size).toBe(1);
    expect(result.invalidProperties.get("testprop1")).toBeInstanceOf(
      InvalidProperty,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(result.invalidProperties.get("testprop1")?.errorMessages.size).toBe(
      1,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c1"),
    ).toBe("Errormessage 1");
  });

  it("should be able to build an exception from more than 1 ValidationErrors", () => {
    const errors: ValidationError[] = [
      {
        property: "testprop1",
        constraints: { c1: "Errormessage 1" },
      },
      {
        property: "testprop2",
        constraints: { c2: "Errormessage 2" },
      },
    ];

    const result = exceptionFactory(errors);

    expect(result).toBeInstanceOf(InvalidDataException);
    expect(result.invalidProperties).toBeInstanceOf(Map);
    expect(result.invalidProperties.size).toBe(2);
    expect(result.invalidProperties.get("testprop1")).toBeInstanceOf(
      InvalidProperty,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages,
    ).toBeInstanceOf(Map);
    expect(result.invalidProperties.get("testprop1")?.errorMessages.size).toBe(
      1,
    );
    expect(
      result.invalidProperties.get("testprop1")?.errorMessages.get("c1"),
    ).toBe("Errormessage 1");
    expect(result.invalidProperties.get("testprop1")?.children).toBeInstanceOf(
      Map,
    );
    expect(result.invalidProperties.get("testprop1")?.children.size).toBe(0);
    expect(result.invalidProperties.get("testprop2")?.errorMessages.size).toBe(
      1,
    );
    expect(
      result.invalidProperties.get("testprop2")?.errorMessages.get("c2"),
    ).toBe("Errormessage 2");
    expect(result.invalidProperties.get("testprop2")?.children).toBeInstanceOf(
      Map,
    );
    expect(result.invalidProperties.get("testprop2")?.children.size).toBe(0);
  });
});
