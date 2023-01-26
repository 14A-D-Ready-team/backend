import { ValidationPipe } from "@nestjs/common";
import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { InvalidJsonException } from "./exceptions";
import { validationPipeConfig } from "./validation-pipe.config";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super(validationPipeConfig);
  }

  public transform(value: unknown, metadata: ArgumentMetadata) {
    if (value && metadata.type === "query" && typeof value == "object") {
      value = this.serializeQueryParams(value);
    }

    return super.transform(value, metadata);
  }

  private serializeQueryParams(queryParams: object) {
    const rawJsonKeyValues = Object.entries(queryParams).map(
      ([key, value]) => `"${key}":${value}`,
    );

    const rawJson = `{ ${rawJsonKeyValues.join(",")} }`;

    try {
      return JSON.parse(rawJson);
    } catch (error) {
      throw new InvalidJsonException();
    }
  }
}
