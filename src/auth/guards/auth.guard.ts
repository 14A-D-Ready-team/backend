import { Reflector } from "@nestjs/core";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthMetadata, authMetadataKey } from "../decorator";
import { User } from "@/user";
import { AuthService } from "../auth.service";
import { AuthState } from "../auth.state";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const authState = await this.authenticate(context);

    return true;
  }

  private async authenticate(context: ExecutionContext) {
    const authenticate = this.needsAuthentication(context);

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const userId = Reflect.get(req.session, "userId");

    let user: User | null = null;

    if (authenticate && userId) {
      user = await this.authService.sessionLogin(userId);
    }

    return (res.locals.authState = new AuthState(user || userId, req.session));
  }

  private async authorize(authState: AuthState) {
    throw new NotImplementedException();
  }

  private needsAuthentication(context: ExecutionContext): boolean {
    const controllerMeta = this.reflector.get<AuthMetadata>(
      authMetadataKey,
      context.getClass(),
    );
    const handlerMeta = this.reflector.get<AuthMetadata>(
      authMetadataKey,
      context.getHandler(),
    );

    if (handlerMeta?.authenticate === undefined) {
      return controllerMeta?.authenticate;
    }

    return handlerMeta?.authenticate;
  }
}
