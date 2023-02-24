import { Reflector } from "@nestjs/core";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { authMetadataKey } from "../decorator";
import { User } from "@/user";
import { AuthService } from "../auth.service";
import { AuthState } from "../auth.state";
import { policiesMetadataKey, PolicyHandler } from "@/shared/policy";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticate = this.needsAuthentication(context);

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const userId = Reflect.get(req.session, "userId");

    let user: User | null = null;

    if (authenticate && userId) {
      user = await this.authService.sessionLogin(userId);
    }

    const authState = new AuthState(user || userId, req.session);
    res.locals.authState = authState;

    return true;
  }

  private needsAuthentication(context: ExecutionContext): boolean {
    const authenticateController = this.reflector.get<boolean>(
      authMetadataKey,
      context.getClass(),
    );
    const authenticateHandler = this.reflector.get<boolean>(
      authMetadataKey,
      context.getHandler(),
    );

    if (authenticateHandler === undefined) {
      return authenticateController;
    }

    return authenticateHandler;
  }
}
