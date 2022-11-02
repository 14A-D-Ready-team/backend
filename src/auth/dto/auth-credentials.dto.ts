import { IdentifiedReference } from "@mikro-orm/core";
import { Admin, BuffetOwner, BuffetWorker, Customer } from "src/user/entity";
import { UserStatus, UserType } from "src/user/enum";

export class AuthCredentialsDto {
  public type!: UserType;
  public name?: string;
  public email!: string;
  public password!: string;
  public status!: UserStatus;
  public customer!: IdentifiedReference<Customer>;
  public admin!: IdentifiedReference<Admin>;
  public buffetWorker!: IdentifiedReference<BuffetWorker>;
  public buffetOwner!: IdentifiedReference<BuffetOwner>;
}
