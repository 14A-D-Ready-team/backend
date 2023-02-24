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

    const buffet = new Buffet({
      ...payload,
      buffetOwner: user.buffetOwner!,
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
  ): Promise<PaginatedResponse<Buffet>> {
    const [buffets, count] = await this.buffetRepository.findAndCount(
      query.toDbQuery(),
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
