import { AppAbility } from "@/app-ability.factory";
import { Type } from "@nestjs/common";

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler =
  | IPolicyHandler
  | Type<IPolicyHandler>
  | PolicyHandlerCallback;
