import { Category } from "@/category/entity";
import { Product } from "@/product/entity";
import { BuffetReview } from "@/review/entity/buffet-review.entity";
import { BuffetOwner, BuffetWorker } from "@/user/entity";
import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
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

  @OneToMany(() => BuffetStatus, buffetStatus => buffetStatus.buffet, {
    orphanRemoval: true,
  })
  public status = new Collection<BuffetStatus>(this);

  @OneToMany(() => Product, product => product.buffet, {
    orphanRemoval: true,
  })
  public products = new Collection<Product>(this);

  @OneToMany(() => Category, category => category.buffet, {
    orphanRemoval: true,
  })
  public categories = new Collection<Category>(this);

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffetOwner: IdentifiedReference<BuffetOwner>;

  @OneToMany(() => BuffetWorker, buffetWorker => buffetWorker.buffet, {
    orphanRemoval: true,
  })
  public employees = new Collection<BuffetWorker>(this);

  @OneToMany(
    () => BuffetInviteToken,
    buffetInviteToken => buffetInviteToken.buffet,
    {
      orphanRemoval: true,
    },
  )
  public inviteTokens = new Collection<BuffetInviteToken>(this);

  @OneToMany(() => BuffetReview, buffetReview => buffetReview.buffet, {
    orphanRemoval: true,
  })
  public reviews = new Collection<BuffetReview>(this);
}
