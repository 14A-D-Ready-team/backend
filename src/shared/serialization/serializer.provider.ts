import { ClassSerializerInterceptor } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { serializationConfig } from "./serialization.config";

export const serializationInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useFactory: (reflector: any) =>
    new ClassSerializerInterceptor(reflector, serializationConfig),
  inject: ["Reflector"],
};
