import { applyDecorators, NotFoundException, Type } from "@nestjs/common";
import { ApiNotFoundResponse } from "@nestjs/swagger";
import { createErrorCodeDescription } from "../utils";

export function NotFoundResponse(
  ...additionalExceptions: Type<unknown>[]
): MethodDecorator & ClassDecorator {
  const exceptions = [NotFoundException, ...additionalExceptions];

  return applyDecorators(
    ApiNotFoundResponse({
      description: createErrorCodeDescription(exceptions),
    }),
  );
}
