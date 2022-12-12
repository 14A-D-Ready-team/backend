import { Global, Module } from "@nestjs/common";
import { PolicyGuard } from "./guards";

@Global()
@Module({
  imports: [],
  providers: [PolicyGuard],
  exports: [PolicyGuard],
})
export class PolicyModule {}
