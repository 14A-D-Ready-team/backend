import { ConfigType } from "@nestjs/config";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import session from "express-session";
import { sessionConfig } from "./session.config";
import { Handler } from "express";
import { findConfigFile } from "@ts-morph/common/lib/typescript";
import pgSessionStore from "connect-pg-simple";

const SessionStore = pgSessionStore(session);
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
        sameSite: "none",
        httpOnly: true,
        maxAge: config.cookie.maxAge,
      },
      name: config.cookie.name,
      rolling: true,
      resave: true,
      saveUninitialized: false,
      store: config.isRender
        ? new SessionStore({
            createTableIfMissing: true,
            conString: config.connectionString,
          })
        : undefined,
    });
  }

  public use(req: any, res: any, next: () => void) {
    this.expressSession(req, res, next);
  }
}
