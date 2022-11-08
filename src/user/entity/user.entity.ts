import { Token } from "@/token";
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
  Unique,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { Admin, BuffetOwner, BuffetWorker, Customer } from ".";
import { UserType, UserStatus } from "../enum";

@Entity()
export class User {
  [PrimaryKeyType]?: [number, UserType];

  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id!: number;

  @Enum({ primary: true })
  @Expose()
  public type!: UserType;

  @Property({ length: 50 })
  @Expose()
  public name!: string;

  @Property({ length: 80, unique: true })
  @Expose()
  public email!: string;

  @Property({ length: 255 })
  public password?: string;

  @Enum()
  @Expose()
  public status!: UserStatus;

  @OneToOne({
    mappedBy: (admin: Admin) => admin.user,
    orphanRemoval: true,
    eager: true,
  })
  public admin?: IdentifiedReference<Admin>;

  @OneToOne({
    mappedBy: (customer: Customer) => customer.user,
    orphanRemoval: true,
  })
  public customer?: IdentifiedReference<Customer>;

  @OneToOne({
    mappedBy: (buffetWorker: BuffetWorker) => buffetWorker.user,
    orphanRemoval: true,
    eager: true,
  })
  public buffetWorker?: IdentifiedReference<BuffetWorker>;

  @OneToOne({
    mappedBy: (buffetOwner: BuffetOwner) => buffetOwner.user,
    orphanRemoval: true,
    eager: true,
  })
  public buffetOwner?: IdentifiedReference<BuffetOwner>;

  @OneToMany({
    mappedBy: (token: Token) => token.user,
    joinColumn: "user_id",
    orphanRemoval: true,
  })
  public tokens = new Collection<Token>(this);
}
function unique() {
  throw new Error("Function not implemented.");
}
