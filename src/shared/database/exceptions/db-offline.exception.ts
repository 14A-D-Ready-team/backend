import { TransformableException } from "@/shared/exceptions";
import { HttpException, ServiceUnavailableException } from "@nestjs/common";

export class DbOfflineException extends TransformableException {
  constructor() {
    super();
  }

  public toHttpError(): HttpException {
    return new ServiceUnavailableException();
  }
}
