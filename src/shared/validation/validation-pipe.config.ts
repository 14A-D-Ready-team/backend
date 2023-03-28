import { ValidationPipeOptions } from "@nestjs/common";
import { exceptionFactory } from "./utils";

export const classTransformerOptions = {
  excludeExtraneousValues: true,
  enableImplicitConversion: true,
  exposeUnsetFields: false,
};

export const validationPipeConfig: ValidationPipeOptions = {
  transform: true,
  validateCustomDecorators: true,
  transformOptions: classTransformerOptions,
  exceptionFactory,
};
