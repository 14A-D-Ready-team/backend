import { CustomDecorator, SetMetadata } from "@nestjs/common";

export interface AuthMetadata {
  authenticate: boolean;
  roles?: string[];
}

export const authMetadataKey = "auth";

export const Auth = authDecorator;

function authDecorator(authenticate?: boolean): CustomDecorator<string>;
function authDecorator(...roles: string[]): CustomDecorator<string>;
function authDecorator(...params: any[]): CustomDecorator<string> {
  const authenticate = params[0];
  const roles =
    typeof params[0] === "string" ? (params as string[]) : undefined;

  return SetMetadata(authMetadataKey, {
    authenticate,
    roles,
  } as AuthMetadata);
}
