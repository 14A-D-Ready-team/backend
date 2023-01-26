import { serializationConfig } from "./serialization.config";
import { ClassSerializerInterceptor, Inject } from "@nestjs/common";
import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { delay, map, Observable } from "rxjs";
import { Response } from "./response.model";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor {
  constructor(@Inject("Reflector") readonly reflector: Reflector) {
    super(reflector, serializationConfig);
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return super.intercept(context, next).pipe(
      map(x => (typeof x === "object" ? ({ data: x } as Response) : x)),
      delay(350),
    );
  }
}
