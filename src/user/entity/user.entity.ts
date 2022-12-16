import { Token } from "@/token/token.entity";
import {
  Collection,
  Entity,
  Enum,
  IdentifiedReference,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Admin, BuffetOwner, BuffetWorker, Customer } from ".";
import { UserType, UserStatus } from "../enum";

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id!: number;

  @Enum()
  @Expose()
  public type!: UserType;

  @ApiProperty()
  @Property({ length: 50 })
  @Expose()
  public name!: string;

  @ApiProperty()
  @Property({ length: 80, unique: true })
  @Expose()
  public email!: string;

  @Property({ length: 255 })
  public password?: string;

  @ApiProperty({ enum: UserStatus })
  @Enum()
  @Expose()
  public status!: UserStatus;

  @OneToOne({
    mappedBy: (admin: Admin) => admin.user,
    orphanRemoval: true,
    eager: true,
  })
  public admin?: IdentifiedReference<Admin>;

  @OneToOne({
    mappedBy: (customer: Customer) => customer.user,
    orphanRemoval: true,
    eager: true,
  })
  public customer?: IdentifiedReference<Customer>;

  @OneToOne({
    mappedBy: (buffetWorker: BuffetWorker) => buffetWorker.user,
    orphanRemoval: true,
    eager: true,
  })
  public buffetWorker?: IdentifiedReference<BuffetWorker>;

  @OneToOne({
    mappedBy: (buffetOwner: BuffetOwner) => buffetOwner.user,
    orphanRemoval: true,
    eager: true,
  })
  public buffetOwner?: IdentifiedReference<BuffetOwner>;

  @OneToMany({
    mappedBy: (token: Token) => token.user,
    orphanRemoval: true,
  })
  public tokens = new Collection<Token>(this);
}
