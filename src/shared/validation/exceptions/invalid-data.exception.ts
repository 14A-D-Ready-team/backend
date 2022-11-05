import { BadRequestException } from "@nestjs/common";
import { Expose, Type } from "class-transformer";

export class InvalidProperty {
  @Expose()
  @Type(() => String)
  public errorMessages: Map<string, string>;

  @Expose()
  @Type(() => InvalidProperty)
  public children: Map<string, InvalidProperty>;

  constructor(
    errorMessages: Map<string, string>,
    children: Map<string, InvalidProperty>,
  ) {
    this.errorMessages = errorMessages;
    this.children = children;
  }
}

export class InvalidDataException extends BadRequestException {
  @Expose()
  @Type(() => InvalidProperty)
  public invalidProperties: Map<string, InvalidProperty>;

  constructor(invalidProperties: Map<string, InvalidProperty>) {
    super();
    this.invalidProperties = invalidProperties;
  }
}
