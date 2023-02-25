import { Auth } from "@/auth";
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { Response } from "express";

export const needsAbilityMetadataKey = "needsAbility";

const enchancer = (target: object, propertyKey: string | symbol) => {
  const descriptor = Reflect.getOwnPropertyDescriptor(
    target,
    propertyKey,
  ) as PropertyDescriptor;
  applyDecorators(Auth(), SetMetadata(needsAbilityMetadataKey, true))(
    target,
    propertyKey,
    descriptor,
  );
};

export const InjectAbility = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response: Response = ctx.switchToHttp().getResponse();
    return response.locals.ability;
  },
  [enchancer],
);
