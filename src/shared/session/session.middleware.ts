import { ConfigType } from "@nestjs/config";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Handler } from "express";
import session, { Store } from "express-session";
import { sessionConfig } from "./session.config";
import { Sequelize } from "sequelize";
import connectSession from "connect-session-sequelize";
import express from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private expressSession: Handler;

  constructor(
    @Inject(sessionConfig.KEY)
    private config: ConfigType<typeof sessionConfig>,

    @InjectPinoLogger(SessionMiddleware.name)
    private pinoLogger: PinoLogger,
  ) {
    this.expressSession = session({
      secret: config.secret,
      cookie: {
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        httpOnly: true,
        maxAge: config.cookie.maxAge,
      },
      name: config.cookie.name,
      rolling: false,
      resave: false,
      saveUninitialized: true,
      store: config.useDbSessionStore
        ? this.initializeSessionStore()
        : undefined,
      proxy: true,
    });
  }

  public use(req: express.Request, res: any, next: () => void) {
    this.expressSession(req, res, next);
  }

  private initializeSessionStore() {
    const SequelizeStore = connectSession(session.Store);

    const sequelize = new Sequelize(this.config.connectionString!, {
      dialect: "mysql",
      logging: sql => {
        this.pinoLogger.debug(sql);
      },
    });

    const store = new SequelizeStore({
      db: sequelize,
    });
    store.sync({});

    return store;
  }
}
