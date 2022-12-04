import {
  applyDecorators,
  InternalServerErrorException,
  Type,
} from "@nestjs/common";
import { ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { createErrorCodeDescription } from "../utils";

export function InternalServerErrorResponse(
  ...additionalExceptions: Type<unknown>[]
): MethodDecorator & ClassDecorator {
  const exceptions = [InternalServerErrorException, ...additionalExceptions];

  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: createErrorCodeDescription(exceptions),
    }),
  );
}
