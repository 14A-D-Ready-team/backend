import { User } from "@/user";
import { Module } from "@nestjs/common";
import { AppAbilityFactory } from "./app-ability.factory";
import { PoliciesGuard } from "./policies.guard";

@Module({
  imports: [],
  providers: [PoliciesGuard, AppAbilityFactory],
  exports: [PoliciesGuard],
})
export class PolicyModule {
  constructor(private f: AppAbilityFactory) {
    const user = new User();
    console.log(f.createForUser(user).rules);
  }
}
