import { Global, Module, Provider, ValidationPipe } from "@nestjs/common";
import { exceptionFactory } from "./utils";

export const validationPipeProvider: Provider<ValidationPipe> = {
  provide: ValidationPipe,
  useFactory: () => {
    console.log("asdf");
    return new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      transformOptions: { excludeExtraneousValues: true },
      exceptionFactory,
    });
  },
};

@Global()
@Module({
  providers: [validationPipeProvider],
  exports: [validationPipeProvider],
})
export class ValidationModule {}
