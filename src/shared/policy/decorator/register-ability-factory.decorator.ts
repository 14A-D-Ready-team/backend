import { Type } from "@nestjs/common";
import { AbilityFactory } from "../ability-factory.interface";

export const registeredAbilityFactories: Array<Type<AbilityFactory>> = [];

export function RegisterAbilityFactory() {
  return function (target: Type<AbilityFactory>) {
    registeredAbilityFactories.push(target);
  };
}
