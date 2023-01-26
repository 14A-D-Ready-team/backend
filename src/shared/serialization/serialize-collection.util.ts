import { Collection } from "@mikro-orm/core";
import { TransformFnParams } from "class-transformer";

export function serializeCollection<T extends object>(
  params: TransformFnParams,
) {
  const value = params.value as Collection<T>;
  return value ? value.getItems() : [];
}
