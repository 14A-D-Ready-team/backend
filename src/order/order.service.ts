import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Order, OrderStatus, OrderedProduct } from "./entity";
import { BaseRepository } from "@/shared/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Customer, User } from "@/user";
import { Buffet } from "@/buffet";
import { OrderStatusEnum } from "./enum/order-status.enum";
import { Product, ProductNotFoundException } from "@/product";
import { Collection, Reference } from "@mikro-orm/core";
import { NoMultiBuffetOrderException } from "./exceptions";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: BaseRepository<Order>,

    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,

    @InjectRepository(Product)
    private productRepository: BaseRepository<Product>,
  ) {}

  public async place(payload: CreateOrderDto, user: User) {
    /* const products = await this.productRepository.find(
      {
        id: {
          $in: payload.products.map(p => p.productId),
        },
      },
      { populate: ["category", "category.buffet"] },
    );
    if (products.length !== payload.products.length) {
      throw new ProductNotFoundException();
    }
    const buffetIds = new Set(products.map(p => p.category));
    if (buffetIds.size !== 1) {
      throw new NoMultiBuffetOrderException();
    }

    const buffet = products[0].category.getEntity().buffet;

    const orderedProducts = products.map(p => {
      const { amount, selectedOptionIds } = payload.products.find(
        p2 => p2.productId === p.id,
      )!;

      return new OrderedProduct({
        amount,
        name: p.name,
        description: p.description,
        fullPrice: p.fullPrice,
        discountedPrice: p.discountedPrice,
        product: Reference.create(p as Product),
      });
    }); */

    const order = new Order({
      requestedPickupTime: payload.requestedPickup,
      customer: user.customer,
      /* buffet, */
    });

    order.statusHistory = new Collection(order, [
      new OrderStatus(OrderStatusEnum.Placed, new Date(), payload.message),
    ]);

    await this.orderRepository.persistAndFlush(order);
    return order;
  }
}
