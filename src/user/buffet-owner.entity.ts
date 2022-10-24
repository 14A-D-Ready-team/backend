import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import User from './user.entity';

@Entity() 
export default class BuffetOwner {

    @OneToOne({mappedBy : (user: User) => user.buffetOwner})
    user!: User;
}