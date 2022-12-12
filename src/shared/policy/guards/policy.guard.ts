import { AppAbility, AppAbilityFactory } from "@/app-ability.factory";
import { AuthState } from "@/auth";
import { User } from "@/user";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Type,
} from "@nestjs/common";
import { ModuleRef, Reflector } from "@nestjs/core";
import { Response } from "express";
import { Observable } from "rxjs";
import { policiesMetadataKey } from "../decorator";
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
    if (policies.length === 0) {
      return true;
    }

    const res = context.switchToHttp().getResponse<Response>();
    const authState: AuthState = res.locals.authState;

    if (!authState?.isLoggedIn) {
      return false;
    }

    if (!authState.isUserLoaded) {
      throw new Error("User is not loaded by AuthGuard");
    }

    const ability = this.appAbilityFactory.createForUser(
      authState.user as User,
    );

    return policies.every(policy => this.checkPolicy(policy, ability), this);
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

  private checkPolicy(policy: PolicyHandler, ability: AppAbility) {
    if (this.isPolicyHandlerType(policy)) {
      const policyHandler = this.moduleRef.get(policy, { strict: false });
      return policyHandler.handle(ability);
    }

    if (typeof policy === "function") {
      return policy(ability);
    }

    return policy.handle(ability);
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
