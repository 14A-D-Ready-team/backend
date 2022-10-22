import { Entity, PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export default class TestEntity {
  @PrimaryKey({ type: "uuid" })
  public id: string = v4();
}
