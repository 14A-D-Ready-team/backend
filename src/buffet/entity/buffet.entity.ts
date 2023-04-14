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
import { Expose, Transform } from "class-transformer";
import { BuffetInviteToken } from "./buffet-invite-token.entity";
import { BuffetStatus } from "./buffet-status.entity";

export type RawBuffet = Partial<Buffet>;

@Entity()
export class Buffet {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id!: number;

  @Property({ length: 100 })
  @Expose()
  public name!: string;

  //coordináta
  @Property({ length: 100 })
  @Expose()
  public coords!: string;

  @Property({ length: 100 })
  @Expose()
  public address!: string;

  @Property({ length: 300 })
  @Expose()
  public hours?: string;

  @Property({ length: 800 })
  @Expose()
  public description?: string;

  @Property({ columnType: "mediumblob" })
  public image: Buffer;

  @Property({ length: 35 })
  public imageType: string;

  @OneToMany(() => BuffetStatus, buffetStatus => buffetStatus.buffet, {
    orphanRemoval: true,
  })
  public status = new Collection<BuffetStatus>(this);

  @OneToMany(() => Category, category => category.buffet, {
    orphanRemoval: true,
  })
  public categories = new Collection<Category>(this);

  public get categoryIds() {
    return this.categories.getIdentifiers();
  }

  public get ownerId() {
    return this.buffetOwner.getEntity().user.id;
  }

  @Expose({ name: "ownerId" })
  @Transform(params => {
    const owner = params.value as BuffetOwner;
    return owner.user.id;
  })
  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public buffetOwner!: IdentifiedReference<BuffetOwner>;

  @OneToMany(() => BuffetWorker, buffetWorker => buffetWorker.buffet, {
    orphanRemoval: true,
  })
  public employees? = new Collection<BuffetWorker>(this);

  @OneToMany(
    () => BuffetInviteToken,
    buffetInviteToken => buffetInviteToken.buffet,
    {
      orphanRemoval: true,
    },
  )
  public inviteTokens? = new Collection<BuffetInviteToken>(this);

  @OneToMany(() => BuffetReview, buffetReview => buffetReview.buffet, {
    orphanRemoval: true,
  })
  public reviews? = new Collection<BuffetReview>(this);

  constructor(data: RawBuffet = {}) {
    Object.assign(this, data);
  }
}
