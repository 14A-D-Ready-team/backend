import { Module } from "@nestjs/common";
import { SerializerInterceptor } from "./serializer.interceptor";

@Module({
  imports: [],
  controllers: [],
  providers: [SerializerInterceptor],
  exports: [SerializerInterceptor],
})
export class SerializationModule {}
