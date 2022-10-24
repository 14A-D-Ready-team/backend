import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Admin from "./admin.entity";
import BuffetOwner from "./buffet-owner.entity";
import BuffetWorker from "./buffet-worker.entity";
import Customer from "./customer.entity";
import Token from "src/token/token.entity";

@Entity()
export default class User {
  @PrimaryKey({ autoincrement: true })
  public id!: number;

  @Property({ length: 50 })
  public name?: string;

  @Property({ length: 50 })
  public email!: string;

  @Property({ length: 255 })
  public password!: string;

  @Property({ length: 50 })
  public status!: string;

  @OneToOne({ mappedBy: (admin: Admin) => admin.user })
  public admin!: Admin;

  @OneToOne({ mappedBy: (customer: Customer) => customer.user })
  public customer!: Customer;

  @OneToOne({ mappedBy: (buffetWorker: BuffetWorker) => buffetWorker.user })
  public buffetWorker!: BuffetWorker;

  @OneToOne({ mappedBy: (buffetOwner: BuffetOwner) => buffetOwner.user })
  public buffetOwner!: BuffetOwner;

  @OneToMany(() => Token, token => token.tokens)
  tokens = new Collection<Token>(this);
}
