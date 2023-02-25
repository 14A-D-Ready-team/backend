import { CustomDecorator, SetMetadata, UseGuards } from "@nestjs/common";

export const authMetadataKey = "auth";

export const Auth = authDecorator;

function authDecorator(authenticate = true): CustomDecorator<string> {
  return SetMetadata(authMetadataKey, authenticate);
}
