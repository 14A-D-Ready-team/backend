import { SetMetadata } from "@nestjs/common";

export const authenticateMetadataKey = "authenticate";

export const Authenticate = (authenticate = true) =>
  SetMetadata(authenticateMetadataKey, authenticate);
