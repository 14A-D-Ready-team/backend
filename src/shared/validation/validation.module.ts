import { Global, Module } from "@nestjs/common";
import { CustomValidationPipe } from "./custom-validation.pipe";

@Global()
@Module({
  providers: [CustomValidationPipe],
  exports: [CustomValidationPipe],
})
export class ValidationModule {}
