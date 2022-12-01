import { User } from "@/user";
import { IdentifiedReference } from "@mikro-orm/core";
import { IsEnum, IsUUID } from "class-validator";
import { TokenType } from "../token-type.enum";


export class TokenDto{
    @IsUUID()
    public id!: string;

    @IsEnum(TokenType)
    public type!: TokenType;

    public user!: User;
}