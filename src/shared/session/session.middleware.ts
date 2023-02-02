import { ConfigType } from "@nestjs/config";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Handler } from "express";
import session, { Store } from "express-session";
import { sessionConfig } from "./session.config";
import { Sequelize } from "sequelize";
import connectSession from "connect-session-sequelize";
import express from "express";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private expressSession: Handler;

  constructor(
    @Inject(sessionConfig.KEY)
    private config: ConfigType<typeof sessionConfig>,
  ) {
    this.expressSession = session({
      secret: config.secret,
      cookie: {
        secure: config.cookie.secure,
        sameSite: "none",
        httpOnly: true,
        maxAge: config.cookie.maxAge,
        domain: config.cookie.domain,
      },
      name: config.cookie.name,
      rolling: false,
      resave: false,
      saveUninitialized: true,
      store: config.isRender ? this.initializeSessionStore() : undefined,
      proxy: true,
    });
  }

  public use(req: express.Request, res: any, next: () => void) {
    console.log(req.cookies);
    this.expressSession(req, res, next);
  }

  private initializeSessionStore() {
    const SequelizeStore = connectSession(session.Store);

    const sequelize = new Sequelize(this.config.connectionString!, {
      dialect: "postgres",
    });

    const store = new SequelizeStore({
      db: sequelize,
    });
    store.sync({});

    return store;
  }
}
