import {
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import User from "src/user/entity/user.entity";
import { TokenType } from "./token-type.enum";

@Entity()
export default class Token {
  @PrimaryKey({ type: "uuid" })
  public id!: string;

  @Enum()
  public type!: TokenType;

  @ManyToOne({ referenceColumnName: "id", joinColumn: "user_id", eager: true })
  public user!: IdentifiedReference<User>;
}
