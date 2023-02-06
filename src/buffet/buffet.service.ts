import { BaseRepository } from "@/shared/database";
import { PaginatedResponse } from "@/shared/pagination";
import { User } from "@/user";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { Buffet } from "./entity/buffet.entity";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";
import { SearchBuffetsQuery } from "./query";
import { FilterBuffetsQuery } from "./query/filtered-buffets.query";

@Injectable()
export class BuffetService {
  constructor(
    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>,
  ) {}

  public async create(payload: CreateBuffetDto, user: User) {
    //kell check hogy owner e majd (AUTHORIZÁCIÓBAN)

    const buffet = this.buffetRepository.create({
      ...payload,
      buffetOwner: user.buffetOwner!,
    });

    await this.buffetRepository.persistAndFlush(buffet);
    return buffet;
  }

  public findOne(id: number) {
    return this.buffetRepository.findOne(id);
  }

  public async find(
    query: FilterBuffetsQuery,
  ): Promise<PaginatedResponse<Buffet>> {
    const [buffets, count] = await this.buffetRepository.findAndCount(
      query.toDbQuery(),
      {
        limit: query.take === undefined ? (null as any) : query.take,
        offset: query.skip,
      },
    );

    return new PaginatedResponse(buffets, count);
  }


  //kiirja az összes büfét jelenleg
  //sztem a namet itt meg kéne adnom h a name paramra keressen rá
  //a kilogolt query a controllerbe ürest SearchBuffetQueryt ad -> SearchBuffetQuery { } 
  //should probably Ádosz
  public async search(
    query: SearchBuffetsQuery,
    name: string,
  ): Promise<PaginatedResponse<Buffet>> {
    const [buffets, count] = await this.buffetRepository.findAndCount(
      query.toDbQuery(),
      {
        limit: query.take === undefined ? (null as any) : query.take,
        offset: query.skip,
      },
    );
  
    return new PaginatedResponse(buffets, count);
  }


  public async update(id: number, payload: UpdateBuffetDto) {
    let buffetToUpdate = await this.findOne(id);
    if (!buffetToUpdate) {
      throw new BuffetNotFoundException();
    }
    buffetToUpdate = this.buffetRepository.assign(buffetToUpdate, payload);
    await this.buffetRepository.persistAndFlush(buffetToUpdate);
    return buffetToUpdate;
  }

  public async remove(id: number) {
    const entity = await this.findOne(id);
    if (entity) {
      await this.buffetRepository.removeAndFlush(entity);
    }
  }
}
