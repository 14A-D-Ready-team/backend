import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Order } from "./entity";
import { BaseRepository } from "@/shared/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Customer, User } from "@/user";
import { Buffet } from "@/buffet";
import { OrderStatusEnum } from "./enum/order-status.enum";
import { Product } from "@/product";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: BaseRepository<Order>,
  ) {}

  public async create(
    payload: CreateOrderDto,
    user: User,
    buffet: Buffet,
    product: Product,
  ) {

    const order = new Order({
        ...payload,
        customer: user.customer,
        buffet: buffet.orders,
        statuses: Done,
        products: ,
        
        
    });

    
    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
