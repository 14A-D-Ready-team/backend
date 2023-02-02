import { ConfigType } from "@nestjs/config";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Handler } from "express";
import session from "express-session";
import { sessionConfig } from "./session.config";
import { Sequelize } from "sequelize";
import connectSession from "connect-session-sequelize";

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
      },
      name: config.cookie.name,
      rolling: true,
      resave: true,
      saveUninitialized: false,
      store: config.isRender ? this.initializeSessionStore() : undefined,
      proxy: true,
    });
  }

  public use(req: any, res: any, next: () => void) {
    this.expressSession(req, res, next);
  }

  private initializeSessionStore() {
    const SequelizeStore = connectSession(session.Store);

    const sequelize = new Sequelize(this.config.connectionString!, {
      dialect: "postgres",
    });

    return new SequelizeStore({
      db: sequelize,
    });
  }
}
