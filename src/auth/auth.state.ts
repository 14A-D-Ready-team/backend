import { User } from "@/user";

export class AuthState {
  private _userId?: number;

  private _user?: User;

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

  constructor(param: User | number | undefined) {
    if (param instanceof User) {
      this._user = param;
      this._userId = param.id;
    } else {
      this._userId = param;
    }
  }
}
