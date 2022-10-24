import { Entity, OneToOne } from "@mikro-orm/core";
import User from "./user.entity";

@Entity()
export default class Admin {
  @OneToOne({ 
    inversedBy: (user: User) => user.admin, 
    primary:true
  })
  user!: User;
}0
