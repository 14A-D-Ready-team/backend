import { applyDecorators, Type } from "@nestjs/common";
import { ApiBadRequestResponse } from "@nestjs/swagger";
import { createErrorCodeDescription } from "../utils";

export function BadRequestResponse(
  ...additionalExceptions: Type<unknown>[]
): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiBadRequestResponse({
      description: createErrorCodeDescription(additionalExceptions),
    }),
  );
}
