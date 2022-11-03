import { BadRequestException } from "@nestjs/common";

export class MissingScopesException extends BadRequestException {
  public missingScopes: string[];

  constructor(missingScopes: string[]) {
    super();
    this.missingScopes = missingScopes;
  }
}
