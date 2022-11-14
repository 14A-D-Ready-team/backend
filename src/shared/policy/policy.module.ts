import { Module } from "@nestjs/common";
import { AbilityFactory } from "./ability.factory";
import { PoliciesGuard } from "./policies.guard";

@Module({
  imports: [],
  providers: [PoliciesGuard, AbilityFactory],
  exports: [PoliciesGuard],
})
export class PolicyModule {}
