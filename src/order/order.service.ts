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
  ) {}

  public async place(payload: CreateOrderDto, user: User) {
    const order = new Order({
      requestedPickupTime: payload.requestedPickup,
      customer: user.customer,
    });
  
    order.statusHistory = new Collection(order, [
      new OrderStatus(OrderStatusEnum.Placed, new Date(), payload.message),
    ]);
    
    await this.orderRepository.persistAndFlush(order);
    return order;
  }

  public findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  public async getOrdersOfCustomer(customerId: number) {
  //public async getOrdersOfCustomer(customerId: number, isInProgress: boolean) {
    
    // if (isInProgress === undefined) {
    //   //
    // }
    // else if (isInProgress) {
    //   //
    // }
    // else {
    //   //
    // }

    //const orders = await this.orderRepository.find({ customer: { user: { id: customerId }}, statusHistory: { $contains: [ OrderStatusEnum.Done ] } });

    const orders = await this.orderRepository.find({ customer: { user: { id: customerId }}});

    return orders;
  }
}
