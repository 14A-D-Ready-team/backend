import { UserStatus, UserType } from "./enum";

export interface UserData {
  email: string;
  name: string;
  type: UserType;
  password?: string;
  status?: UserStatus;
}
