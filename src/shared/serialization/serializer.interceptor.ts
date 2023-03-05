import { serializationConfig } from "./serialization.config";
import {
  ClassSerializerInterceptor,
  Inject,
  StreamableFile,
} from "@nestjs/common";
import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable } from "rxjs";
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
      map(x => {
        if (x instanceof StreamableFile || typeof x !== "object") {
          return x;
        }
        return { data: x } as Response;
      }),
    );
  }
}
