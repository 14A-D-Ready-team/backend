import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Order, OrderStatus, OrderedProduct } from "./entity";
import { BaseRepository } from "@/shared/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Customer, User } from "@/user";
import { Buffet } from "@/buffet";
import { OrderStatusEnum } from "./enum/order-status.enum";
import { Product } from "@/product";
import { Collection } from "@mikro-orm/core";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: BaseRepository<Order>,
  ) {}

  public async create(
    payload: CreateOrderDto,
    user: User,
    buffet1: Buffet,
    product: Product,
    orderStatus: OrderStatus,
  ) {


    const order = new Order({
        ...payload,
        customer: user.customer,
        buffet: buffet1.id,
        // statuses: orderStatus.status,
        products: product.orderedProducts,
    });

    
    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
