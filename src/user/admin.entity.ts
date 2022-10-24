import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import User from './user.entity';

@Entity() 
export default class Admin {

    @OneToOne({mappedBy : 'id'})
    adminId!: User;

}