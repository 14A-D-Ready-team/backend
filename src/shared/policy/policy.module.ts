import { Module } from "@nestjs/common";
import { PoliciesGuard } from "./policies.guard";

@Module({
  imports: [],
  providers: [PoliciesGuard],
  exports: [PoliciesGuard],
})
export class PolicyModule {}
