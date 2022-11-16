import { User } from "@/user";
import { Session } from "express-session";

export class AuthState {
  private _userId?: number;

  private _user?: User;

  private _session: Session;

  public get userId() {
    return this._userId;
  }

  public get user() {
    return this._user;
  }

  public get isLoggedIn() {
    return this._userId !== undefined;
  }

  public get isUserLoaded() {
    return this._user !== undefined;
  }

  constructor(param: User | number | undefined, session: Session) {
    if (param instanceof User) {
      this._user = param;
      this._userId = param.id;
    } else {
      this._userId = param;
    }

    this._session = session;
  }

  public logout(): Promise<void> {
    return new Promise((resolve, reject) =>
      this._session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    );
  }
}
