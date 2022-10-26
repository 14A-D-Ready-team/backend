import {
  BadRequestException,
  Global,
  Module,
  ValidationPipe,
} from "@nestjs/common";

@Global()
@Module({
  providers: [
    {
      provide: ValidationPipe,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          validateCustomDecorators: true,
          exceptionFactory: errors => new BadRequestException("hiba"),
        }),
    },
  ],
})
export class ValidationModule {}
