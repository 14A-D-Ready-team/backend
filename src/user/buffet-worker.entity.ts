import { Entity, OneToOne } from "@mikro-orm/core";
import User from "./user.entity";

@Entity()
export default class BuffetWorker {
  @OneToOne({ 
    inversedBy: (user: User) => user.buffetWorker,
    primary:true
  })
  user!: User;
}
