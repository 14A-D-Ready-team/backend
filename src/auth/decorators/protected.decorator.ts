import { SetMetadata } from "@nestjs/common";

export const protectedMetadataKey = "protected";

export const Protected = (isProtected = true) =>
  SetMetadata(protectedMetadataKey, isProtected);
