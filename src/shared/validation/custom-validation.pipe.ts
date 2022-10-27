import { ValidationPipe } from "@nestjs/common";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  constructor(private validationPipe: ValidationPipe) {}

  public transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "query" && typeof value === "object") {
      value = this.serializeQueryParams(value);
    }

    return this.validationPipe.transform(value, metadata);
  }

  private serializeQueryParams(queryParams: object) {
    const serializedQueryParams = {} as any;

    for (const [key, value] of Object.entries(queryParams)) {
      serializedQueryParams[key] = JSON.parse(value);
    }

    return serializedQueryParams;
  }
}
