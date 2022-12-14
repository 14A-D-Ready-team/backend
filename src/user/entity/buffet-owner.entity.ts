import { Buffet } from "@/buffet/entity/buffet.entity";
import {
  Collection,
  Entity,
  IdentifiedReference,
  OneToMany,
  OneToOne,
} from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
  })
  public user!: IdentifiedReference<User>;

  @OneToMany(() => Buffet, buffet => buffet.buffetOwner, {
    orphanRemoval: true,
  })
  public buffet = new Collection<Buffet>(this);
}
