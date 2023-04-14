import { AppAbility } from "@/app-ability.factory";
import { User } from "@/user/entity";
import { Type } from "@nestjs/common";

interface IPolicyHandler {
  handle(ability: AppAbility, user?: User): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility, user?: User) => boolean;

export type PolicyHandler =
  | IPolicyHandler
  | Type<IPolicyHandler>
  | PolicyHandlerCallback;
