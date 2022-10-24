import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import User from "./user.entity";

@Entity()
export default class Customer {

    @OneToOne({mappedBy : (user: User) => user.customer})
    user!: User;
}
