import {
  applyDecorators,
  ServiceUnavailableException,
  Type,
} from "@nestjs/common";
import { ApiServiceUnavailableResponse } from "@nestjs/swagger";
import { createErrorCodeDescription } from "../utils";

export function ServiceUnavailableResponse(
  ...additionalExceptions: Type<unknown>[]
): MethodDecorator & ClassDecorator {
  const exceptions = [ServiceUnavailableException, ...additionalExceptions];

  return applyDecorators(
    ApiServiceUnavailableResponse({
      description: createErrorCodeDescription(exceptions),
    }),
  );
}
