import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import User from "src/user/user.entity";

@Entity()
export default class Token {
  @PrimaryKey({ type: "uuid" })
  public id!: string;

  @Property({ length: 50 })
  public type?: string;

  @ManyToOne(() => User)
  public tokens!: User;
}
