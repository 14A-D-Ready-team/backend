import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Order, OrderStatus, OrderedProduct } from "./entity";
import { BaseRepository } from "@/shared/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Customer, User } from "@/user";
import { Buffet } from "@/buffet";
import { OrderStatusEnum } from "./enum/order-status.enum";
import { Product } from "@/product";
import { Collection, Reference } from "@mikro-orm/core";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: BaseRepository<Order>,

    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,
  ) {}

  public async place(payload: CreateOrderDto, user: User) {
    const order = new Order({
      customer: user.customer,
      statusHistory: new Collection(
        new OrderStatus(OrderStatusEnum.Placed, Date.now()),
      ),
    });

    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
