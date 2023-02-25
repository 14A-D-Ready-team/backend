import { Auth } from "@/auth";
import { applyDecorators, SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "../policy.handler";

export const policiesMetadataKey = "policies";

export const CheckPolicies = (...policies: PolicyHandler[]) => {
  return applyDecorators(SetMetadata(policiesMetadataKey, policies), Auth());
};
