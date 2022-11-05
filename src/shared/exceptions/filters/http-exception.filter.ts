import { Response } from "@/shared/serialization";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { instanceToPlain } from "class-transformer";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const serializedException = instanceToPlain(exception, {
      excludeExtraneousValues: true,
    });
    host
      .switchToHttp()
      .getResponse()
      .status(exception.getStatus())
      .send({ errorCode: exception.name, ...serializedException } as Response);
  }
}
