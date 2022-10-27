import { BadRequestException } from "@nestjs/common";
import { Type } from "class-transformer";

export class InvalidProperty {
  @Type(() => String)
  public errorMessages: Map<string, string>;

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

export default class InvalidDataException extends BadRequestException {
  @Type(() => InvalidProperty)
  public invalidProperties: Map<string, InvalidProperty>;

  constructor(invalidProperties: Map<string, InvalidProperty>) {
    super();
    this.invalidProperties = invalidProperties;
  }
}
