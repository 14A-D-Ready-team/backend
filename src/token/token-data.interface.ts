import { User } from "@/user";
import { TokenType } from "./token-type.enum";

export interface TokenData {
   
    id: string;
    type: TokenType;
    user: User;
}