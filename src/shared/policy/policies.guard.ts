import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { policiesMetadataKey } from "./decorator";
import { PolicyHandler } from "./policy.handler";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }

  private getPolicies(context: ExecutionContext): PolicyHandler[] {
    const policiesController = this.reflector.get<PolicyHandler[]>(
      policiesMetadataKey,
      context.getClass(),
    );
    const policiesHandler = this.reflector.get<PolicyHandler[]>(
      policiesMetadataKey,
      context.getHandler(),
    );

    if (policiesHandler === undefined) {
      return policiesController;
    }

    return [...policiesHandler, ...policiesController];
  }
}
