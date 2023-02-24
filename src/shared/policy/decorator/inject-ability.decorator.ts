import { Auth } from "@/auth";
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { Response } from "express";

export const needsAbilityMetadataKey = "needsAbility";

const enchancer = (target: object, propertyKey: string | symbol) => {
  applyDecorators(Auth())(target, propertyKey);
};

export const InjectAbility = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response: Response = ctx.switchToHttp().getResponse();
    return response.locals.ability;
  },
  [enchancer],
);
