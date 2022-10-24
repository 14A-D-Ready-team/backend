import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Admin from "./admin.entity";
import BuffetOwner from "./buffetOwner.entity";
import BuffetWorker from "./buffetWorker.entity";
import Customer from "./customer.entity";
import Token from "./token.entity";

//tábla
@Entity()
export default class User {
  //PK, nálunk csak id
  @PrimaryKey({ autoincrement: true })
  public id!: number;

  //tulajdonság a.k.a adat amit tárolunk
  @Property({ length: 50 })
  public name?: string;

  @Property({ length: 50 })
  public email!: string;

  @Property({ length: 255 })
  public password!: string;

  @Property({ length: 50 })
  public status!: string;

  //kapcsolatok
  @OneToOne({ inversedBy: "adminId" })
  adminId!: Admin;

  @OneToOne({ inversedBy: "customerId" })
  customerId!: Customer;

  @OneToOne({ inversedBy: "buffetWorkerId" })
  buffetWorkerId!: BuffetWorker;

  @OneToOne({ inversedBy: "buffetOwnerId" })
  buffetOwnerId!: BuffetOwner;

  @OneToMany(() => Token, token => token.id)
  tokens = new Collection<Token>(this);
}
