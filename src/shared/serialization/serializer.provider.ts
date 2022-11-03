import { ClassSerializerInterceptor } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

export const serializationInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useFactory: (reflector: any) => new ClassSerializerInterceptor(reflector),
  inject: ["Reflector"],
};
