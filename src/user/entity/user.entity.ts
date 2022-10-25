import {
  Collection,
  Entity,
  Enum,
  IdentifiedReference,
  OneToMany,
  OneToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import Token from "src/token/token.entity";
import { Admin, BuffetOwner, BuffetWorker, Customer } from ".";
import { UserType, UserStatus } from "../enum";

@Entity()
export default class User {
  [PrimaryKeyType]?: [number, UserType];

  @PrimaryKey({ autoincrement: true, unique: true })
  public id!: number;

  @Enum({ primary: true })
  public type!: UserType;

  @Property({ length: 50 })
  public name?: string;

  @Property({ length: 50 })
  public email!: string;

  @Property({ length: 255 })
  public password!: string;

  @Enum()
  public status!: UserStatus;

  @OneToOne({ mappedBy: (admin: Admin) => admin.user, orphanRemoval: true })
  public admin!: IdentifiedReference<Admin>;

  @OneToOne({
    mappedBy: (customer: Customer) => customer.user,
    orphanRemoval: true,
  })
  public customer!: IdentifiedReference<Customer>;

  @OneToOne({
    mappedBy: (buffetWorker: BuffetWorker) => buffetWorker.user,
    orphanRemoval: true,
  })
  public buffetWorker!: IdentifiedReference<BuffetWorker>;

  @OneToOne({
    mappedBy: (buffetOwner: BuffetOwner) => buffetOwner.user,
    orphanRemoval: true,
  })
  public buffetOwner!: IdentifiedReference<BuffetOwner>;

  @OneToMany({
    mappedBy: (token: Token) => token.user,
    joinColumn: "user_id",
    orphanRemoval: true,
  })
  public tokens = new Collection<Token>(this);
}
