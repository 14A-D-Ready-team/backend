import { ConfigType } from "@nestjs/config";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import session from "express-session";
import { sessionConfig } from "./session.config";
import { Handler } from "express";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private expressSession: Handler;

  constructor(
    @Inject(sessionConfig.KEY)
    config: ConfigType<typeof sessionConfig>,
  ) {
    this.expressSession = session({
      secret: config.secret,
      cookie: {
        secure: config.cookie.secure,
        sameSite: "strict",
      },
      name: config.cookie.name,
      resave: false,
      saveUninitialized: false,
    });
  }

  public use(req: any, res: any, next: () => void) {
    this.expressSession(req, res, next);
  }
}
