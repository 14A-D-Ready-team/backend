import { User } from "@/user";
import { Module } from "@nestjs/common";
import { AbilityFactory } from "./app-ability.factory";
import { PoliciesGuard } from "./policies.guard";

@Module({
  imports: [],
  providers: [PoliciesGuard, AbilityFactory],
  exports: [PoliciesGuard],
})
export class PolicyModule {
  constructor(private f: AbilityFactory) {
    const user = new User();
    console.log(f.createForUser(user).rules);
  }
}
