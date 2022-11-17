import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Response } from "express";

export const InjectAuthState = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const res = context.switchToHttp().getResponse<Response>();

    return res.locals.authState;
  },
);
