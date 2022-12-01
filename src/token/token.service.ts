import { Injectable, NotImplementedException } from "@nestjs/common";
import { Token } from "./token.entity";
import {v4 as uuidv4} from 'uuid';
import { TokenType } from './index';
import { InjectRepository } from "@mikro-orm/nestjs";
import { BaseRepository } from "@/shared/database";
import { TokenData } from "./token-data.interface";
import { User } from "@/user";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: BaseRepository<Token>,
  ) {}

  public async createEmailConfirmToken(tokenData: TokenData): Promise<Token> {
    const { id, type, user } = tokenData;

    const token = this.tokenRepository.create({
      id,
      type,
      user,
    })

    token.id = uuidv4();
    token.type = TokenType.EmailVerification;
    token.user.id = user.id;



    this.tokenRepository.persistAndFlush(token);
    
    return token;
  }
}
