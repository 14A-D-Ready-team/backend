import { AppAbility, AppAbilityFactory } from "@/app-ability.factory";
import { AuthState } from "@/auth";
import { User } from "@/user";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Type,
  UnauthorizedException,
} from "@nestjs/common";
import { ModuleRef, Reflector } from "@nestjs/core";
import { Response } from "express";
import { Observable } from "rxjs";
import { needsAbilityMetadataKey, policiesMetadataKey } from "../decorator";
import { PolicyHandler } from "../policy.handler";

@Injectable()
export class PolicyGuard implements CanActivate {
  private appAbilityFactory: AppAbilityFactory;

  constructor(
    private reflector: Reflector,

    private moduleRef: ModuleRef,
  ) {
    this.appAbilityFactory = moduleRef.get(AppAbilityFactory, {
      strict: false,
    });
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies = this.getPolicies(context);
    const hasPolicies = policies.length > 0;
    const needsAbility = this.needsAbility(context) || hasPolicies;

    if (!needsAbility) {
      return true;
    }

    const res = context.switchToHttp().getResponse<Response>();
    const authState: AuthState = res.locals.authState;

    if (authState?.isLoggedIn && !authState.isUserLoaded) {
      throw new Error("User is not loaded by AuthGuard");
    }

    const ability = await Promise.resolve(
      this.appAbilityFactory.createForUser(authState?.user),
    );

    res.locals.ability = ability;

    const hasAbility =
      !hasPolicies ||
      policies.every(
        policy => this.checkPolicy(policy, ability, authState?.user),
        this,
      );

    if (!hasAbility && !authState?.isLoggedIn) {
      throw new UnauthorizedException();
    }
    return hasAbility;
  }

  private needsAbility(context: ExecutionContext) {
    const controllerNeedsAbility = this.reflector.get<boolean>(
      needsAbilityMetadataKey,
      context.getClass(),
    );
    const handlerNeedsAbility = this.reflector.get<boolean>(
      needsAbilityMetadataKey,
      context.getHandler(),
    );
    if (handlerNeedsAbility === undefined) {
      return controllerNeedsAbility;
    }

    return handlerNeedsAbility;
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

    return [...(policiesHandler || []), ...(policiesController || [])];
  }

  private checkPolicy(policy: PolicyHandler, ability: AppAbility, user?: User) {
    if (this.isPolicyHandlerType(policy)) {
      const policyHandler = this.moduleRef.get(policy, { strict: false });
      return policyHandler.handle(ability, user);
    }

    if (typeof policy === "function") {
      return policy(ability, user);
    }

    return policy.handle(ability, user);
  }

  private isPolicyHandlerType(
    policyHandlerType: any,
  ): policyHandlerType is Type<PolicyHandler> {
    return (
      typeof policyHandlerType === "function" &&
      policyHandlerType?.prototype?.handle
    );
  }
}
