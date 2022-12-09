import { Type } from "@nestjs/common";

export function createErrorCodeDescription(exceptions: Type<unknown>[]) {
  return (
    "Error codes: " + exceptions.map(exception => exception.name).join(", ")
  );
}
