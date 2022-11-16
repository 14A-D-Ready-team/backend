import { Module } from "@nestjs/common";
import { PolicyGuard } from "./guards";

@Module({
  imports: [],
  providers: [PolicyGuard],
  exports: [PolicyGuard],
})
export class PolicyModule {}
