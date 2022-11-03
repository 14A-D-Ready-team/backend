import { isDevelopment } from "@/environment";
import { ClassSerializerInterceptorOptions } from "@nestjs/common";

export const serializationConfig: ClassSerializerInterceptorOptions = {
  excludeExtraneousValues: true,
  enableCircularCheck: isDevelopment,
};
