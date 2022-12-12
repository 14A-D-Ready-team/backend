import { ValidationPipeOptions } from "@nestjs/common";
import { exceptionFactory } from "./utils";

export const validationPipeConfig: ValidationPipeOptions = {
  transform: true,
  validateCustomDecorators: true,
  transformOptions: {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    exposeUnsetFields: false,
  },
  exceptionFactory,
};
