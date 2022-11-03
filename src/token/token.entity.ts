import {
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import { TokenType } from "./token-type.enum";
import { User } from "@/user";

@Entity()
export class Token {
  @PrimaryKey({ type: "uuid" })
  public id!: string;

  @Enum()
  public type!: TokenType;

  @ManyToOne({ referenceColumnName: "id", joinColumn: "user_id", eager: true })
  public user!: IdentifiedReference<User>;
}
