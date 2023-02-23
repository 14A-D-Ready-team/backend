import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const MyCustomDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return data;
  },
);
