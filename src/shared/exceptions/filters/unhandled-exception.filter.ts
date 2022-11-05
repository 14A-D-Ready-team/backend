import { Response } from "@/shared/serialization";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    host
      .switchToHttp()
      .getResponse()
      .status(500)
      .send({ errorCode: "InternalServerErrorException" } as Response);
  }
}
