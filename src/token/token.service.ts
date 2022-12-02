import { Injectable, NotImplementedException } from "@nestjs/common";
import { Token } from "./token.entity";
import { v4 as uuidv4 } from "uuid";
import { TokenType } from "./index";
import { InjectRepository } from "@mikro-orm/nestjs";
import { BaseRepository } from "@/shared/database";
import { TokenData } from "./token-data.interface";
import { User } from "@/user";
import { Reference } from "@mikro-orm/core";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: BaseRepository<Token>,
  ) {}

  public async createEmailConfirmToken(user: User): Promise<Token> {
    const token = this.tokenRepository.create({
      id: uuidv4(),
      type: TokenType.EmailVerification,
      user: user,
      //user: Reference.createNakedFromPK(User, user.id),
    });

    this.tokenRepository.persistAndFlush(token);

    return token;
  }
}
