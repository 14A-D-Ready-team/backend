import { validationPipeConfig } from "./validation-pipe.config";
import { ValidationPipe } from "@nestjs/common";
import { ArgumentMetadata, Injectable } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super(validationPipeConfig);
  }

  public transform(value: unknown, metadata: ArgumentMetadata) {
    if (value && metadata.type === "query" && typeof value === "object") {
      value = this.serializeQueryParams(value);
    }

    return super.transform(value, metadata);
  }

  private serializeQueryParams(queryParams: object) {
    const serializedQueryParams = {} as object;

    for (const [key, value] of Object.entries(queryParams)) {
      try {
        Reflect.set(serializedQueryParams, key, JSON.parse(value));
      } catch (error) {
        Reflect.set(serializedQueryParams, key, value);
      }
    }

    return serializedQueryParams;
  }
}
