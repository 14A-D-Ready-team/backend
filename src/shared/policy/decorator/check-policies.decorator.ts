import { SetMetadata } from "@nestjs/common";

export const CheckPolicies = (...args: string[]) =>
  SetMetadata("check-policies", args);
