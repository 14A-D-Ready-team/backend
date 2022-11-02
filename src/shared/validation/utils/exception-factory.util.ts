import { ValidationError } from "@nestjs/common";
import { InvalidDataException, InvalidProperty } from "../exceptions";

export function exceptionFactory(errors: ValidationError[]) {
  return new InvalidDataException(buildInvalidProperties(errors));
}

function buildInvalidProperty(error: ValidationError): InvalidProperty {
  const errorMessages = extractErrorMessages(error);
  const children = buildInvalidProperties(error.children ?? []);

  return new InvalidProperty(errorMessages, children);
}

function extractErrorMessages(error: ValidationError) {
  const entries: Array<[string, string]> = [];
  const constraints = error.constraints ?? {};

  for (const constraintName in constraints) {
    if (!isSkipped(error, constraintName)) {
      entries.push([constraintName, constraints[constraintName]]);
    }
  }

  return new Map(entries);
}

function buildInvalidProperties(errors: ValidationError[]) {
  const entries = errors.map(
    e => [e.property, buildInvalidProperty(e)] as [string, InvalidProperty],
  );

  return new Map(entries);
}

function isSkipped(error: ValidationError, constraintName: string) {
  const contexts = error.contexts ?? {};
  const hasSkipOthers = Object.values(contexts).some(ctx => ctx?.skipOthers);
  if (!hasSkipOthers) {
    return false;
  }

  return !contexts[constraintName]?.skipOthers;
}
