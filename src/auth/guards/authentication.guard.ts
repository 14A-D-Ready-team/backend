import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import {} from "express-session";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authenticate = context.
    const req = context.switchToHttp().getRequest<Request>();
    const userId = Reflect.get(req.session, "userId");

    return true;
  }
}
