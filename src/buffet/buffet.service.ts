import { AppAbility } from "@/app-ability.factory";
import { BaseRepository } from "@/shared/database";
import { PaginatedResponse } from "@/shared/pagination";
import { Action } from "@/shared/policy";
import { User } from "@/user";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { BuffetInviteToken } from "./entity";
import { Buffet } from "./entity/buffet.entity";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";
import { SearchBuffetsQuery } from "./query";
import { v4 as uuidv4 } from "uuid";
import { CreateInviteTokenDto } from "./dto/create-invite-token.dto";

@Injectable()
export class BuffetService {
  constructor(
    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,

    @InjectRepository(BuffetInviteToken)
    private inviteTokenRepository: BaseRepository<BuffetInviteToken>,
  ) {}

  public async create(
    payload: CreateBuffetDto,
    user: User,
    image: Express.Multer.File,
  ) {
    //kell check hogy owner e majd (AUTHORIZÁCIÓBAN)

    const buffet = new Buffet({
      ...payload,
      buffetOwner: user.buffetOwner!,
      image: await readFile(image.path),
      imageType: image.mimetype,
    });

    await this.buffetRepository.persistAndFlush(buffet);
    return buffet;
  }

  public findOne(id: number) {
    return this.buffetRepository.findOne(id);
  }

  //getall search és rendezés is
  public async find(
    query: SearchBuffetsQuery,
    user: User | undefined,
  ): Promise<PaginatedResponse<Buffet>> {
    if (query.own && (!user || user.customer)) {
      return new PaginatedResponse([] as Buffet[], 0);
    }

    let buffetIds: number[] | undefined = undefined;
    if (query.own) {
      if (!user || user.customer) {
        return new PaginatedResponse([] as Buffet[], 0);
      }
      if (user.buffetOwner) {
        buffetIds = user.buffetOwner.unwrap().buffets.getIdentifiers();
      }
      if (user.buffetWorker) {
        buffetIds = [user.buffetWorker.unwrap().buffet.id];
      }
    }

    const [buffets, count] = await this.buffetRepository.findAndCount(
      { ...query.toDbQuery() },
      {
        limit: query.take === undefined ? (null as any) : query.take,
        offset: query.skip,
        orderBy:
          query.orderByField === undefined
            ? undefined
            : { [query.orderByField]: query.order || "ASC" },
      },
    );
    return new PaginatedResponse(buffets, count);
  }

  public async update(
    id: number,
    payload: UpdateBuffetDto,
    image: Express.Multer.File,
    ability: AppAbility,
  ) {
    let buffetToUpdate = await this.findOne(id);
    if (!buffetToUpdate) {
      throw new BuffetNotFoundException();
    }

    if (!ability.can(Action.Update, buffetToUpdate)) {
      throw new ForbiddenException();
    }

    console.log(image);
    const data = {
      ...payload,
      image: await readFile(image.path),
      imageType: image.mimetype,
    };

    buffetToUpdate = this.buffetRepository.assign(buffetToUpdate, data);
    await this.buffetRepository.persistAndFlush(buffetToUpdate);
    return buffetToUpdate;
  }

  public async remove(id: number, ability: AppAbility) {
    const entity = await this.findOne(id);
    if (!entity) {
      return;
    }

    if (!ability.can(Action.Delete, entity)) {
      throw new ForbiddenException();
    }

    await this.buffetRepository.removeAndFlush(entity);
  }

  public async createInviteToken(dto: CreateInviteTokenDto) {
    const buffet = await this.findOne(dto.buffetId);

    if (buffet === null) {
      throw new BuffetNotFoundException();
    }

    const token = this.inviteTokenRepository.create({
      id: uuidv4(),
      buffet,
    });

    await this.inviteTokenRepository.persistAndFlush(token);

    return token;
  }
}
