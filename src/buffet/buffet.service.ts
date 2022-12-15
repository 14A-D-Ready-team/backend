import { Category } from "@/category";
import { UpdateProductDto } from "@/product/dto/update-product.dto";
import { BaseRepository } from "@/shared/database";
import { User } from "@/user";
import { OperatorMap } from "@mikro-orm/core/typings";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { Buffet } from "./entity/buffet.entity";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";
import { OwnerNotFoundException } from "./exception/owner-not-found.exception";

@Injectable()
export class BuffetService {
  constructor(
    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,

    @InjectRepository(User)
    private userRepository: BaseRepository<User>
  ) {}

  public async create(payload: CreateBuffetDto) {
    const owner = await this.userRepository.findOne(payload.ownerId);
    //kell check hogy owner e
    if (!owner) {
      throw new OwnerNotFoundException();
    };

    //Fix this doo doo
    //kell neki az admin user id je?
    const buffet = this.buffetRepository.create({
      ...payload,
      buffetOwner: owner.id,
    });

    await this.buffetRepository.persistAndFlush(buffet);
    return buffet;
  }

  //   public async find(query: FilterProductsQuery) {
  //     const category = await this.getCategoryFromQuery(query);

  //     const fullPrice = this.createPriceQuery(query, "fullPrice");
  //     const discountedPrice = this.createPriceQuery(query, "discountedPrice");

  //     this.productRepository.find(
  //       { category, fullPrice, discountedPrice },
  //       { limit: query.take, offset: query.skip },
  //     );
  //   }

  public findOne(id: number) {
    return this.buffetRepository.findOne(id);
  }

  public async update(id: number, payload: UpdateProductDto) {
    //TODO UpdateBuffetDto
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
