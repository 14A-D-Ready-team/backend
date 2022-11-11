import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import {} from "express-session";
import { authenticateMetadataKey, protectedMetadataKey } from "../decorators";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authenticate = this.reflector.get<boolean>(
      authenticateMetadataKey,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest<Request>();
    const userId = Reflect.get(req.session, "userId");

    return true;
  }

  private isProtected(context: ExecutionContext): boolean {
    const isControllerProtected = this.reflector.get<boolean>(
      protectedMetadataKey,
      context.getClass(),
    );
    const isHandlerProtected = this.reflector.get<boolean>(
      protectedMetadataKey,
      context.getHandler(),
    );

    if (isHandlerProtected === undefined) {
      return isControllerProtected;
    }

    return isHandlerProtected;
  }

  private needsAuthentication(context: ExecutionContext): boolean {
    const isControllerAuth = this.reflector.get<boolean>(
      authenticateMetadataKey,
      context.getClass(),
    );
    const isHandlerAuth = this.reflector.get<boolean>(
      authenticateMetadataKey,
      context.getHandler(),
    );

    if (isHandlerAuth === undefined) {
      return isControllerAuth;
    }

    return isHandlerAuth;
  }
}
