import { Response } from "@/shared/serialization";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { TransformableException } from "../transformable.exception";

@Catch(TransformableException)
export class TransformableExceptionFilter implements ExceptionFilter {
  public catch(exception: TransformableException, host: ArgumentsHost) {
    const httpException = exception.toHttpError();
    const serializedException = instanceToPlain(httpException, {
      excludeExtraneousValues: true,
    });
    host
      .switchToHttp()
      .getResponse()
      .status(httpException.getStatus())
      .send({
        errorCode: httpException.name,
        ...serializedException,
      } as Response);
  }
}
