import { SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "../policy.handler";

export const policiesMetadataKey = "policies";

export const CheckPolicies = (...policies: PolicyHandler[]) =>
  SetMetadata(policiesMetadataKey, policies);
