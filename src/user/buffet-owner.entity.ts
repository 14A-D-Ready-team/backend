import { Entity, OneToOne } from "@mikro-orm/core";
import User from "./user.entity";

@Entity()
export default class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
  })
  user!: User;
}
