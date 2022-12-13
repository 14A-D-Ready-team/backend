import { Category } from "@/category";
import { Product } from "@/product";
import { BuffetReview } from "@/review/entity/buffet-review.entity";
import { Token } from "@/token";
import { BuffetOwner, BuffetWorker } from "@/user";
import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { BuffetStatusEnum } from "../enum/buffet-status.enum";
import { BuffetInviteToken } from "./buffet-invite-token.entity";
import { BuffetStatus } from "./buffet-status.entity";

@Entity()
export class Buffet {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id: number;

  @Property({ length: 100 })
  @Expose()
  public name: string;

  @Property({ length: 100 })
  @Expose()
  public location: string;

  @Property({ length: 100 })
  @Expose()
  public address: string;

  @Property({ length: 20 })
  @Expose()
  public hours: string;

  @Property({ length: 225 })
  @Expose()
  public description: string;

  @ManyToOne({})
  public buffetOwner?: IdentifiedReference<BuffetOwner>;

  @OneToMany(() => BuffetStatus, buffetStatus => buffetStatus.status, {
    orphanRemoval: true,
  })
  public statuses = new Collection<Buffet>(this);

  @OneToMany(() => Product, product => product.id, {
    orphanRemoval: true,
  })
  public produts = new Collection<Product>(this);

  @OneToMany(() => Category, category => category.id, {
    orphanRemoval: true,
  })
  public categories = new Collection<Category>(this);

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public owner: BuffetOwner;

  @OneToMany(() => BuffetWorker, buffetWorker => buffetWorker.user.id, {
    orphanRemoval: true,
  })
  public employees = new Collection<BuffetWorker>(this);

  @OneToMany(
    () => BuffetInviteToken,
    buffetInviteToken => buffetInviteToken.id,
    {
      orphanRemoval: true,
    },
  )
  public inviteTokens = new Collection<BuffetInviteToken>(this);

  @OneToMany(() => BuffetReview, buffetReview => buffetReview.id, {
    orphanRemoval: true,
  })
  public reviews = new Collection<BuffetReview>(this);
}
