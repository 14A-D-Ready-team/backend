import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import {
  Order,
  OrderStatus,
  OrderedCustomization,
  OrderedProduct,
} from "./entity";
import { BaseRepository } from "@/shared/database";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Customer, User } from "@/user";
import { Buffet } from "@/buffet";
import { OrderStatusEnum } from "./enum/order-status.enum";
import {
  Option,
  OptionNotFoundException,
  Product,
  ProductNotFoundException,
} from "@/product";
import { Collection, Reference } from "@mikro-orm/core";
import {
  InvalidCustomizationException,
  NoMultiBuffetOrderException,
} from "./exceptions";
import { map } from "p-iteration";
import { SelectedOption } from "./entity/selected-option.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: BaseRepository<Order>,

    @InjectRepository(Buffet)
    private buffetRepository: BaseRepository<Buffet>,

    @InjectRepository(Product)
    private productRepository: BaseRepository<Product>,

    @InjectRepository(Option)
    private optionRepository: BaseRepository<Option>,
  ) {}

  public async place(payload: CreateOrderDto, user: User) {
    const products = await this.productRepository.find(
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

    const orderedProducts = await map(products, async p => {
      const { amount, selectedOptionIds } = payload.products.find(
        p2 => p2.productId === p.id,
      )!;

      const options = await this.optionRepository.find(
        { id: { $in: selectedOptionIds } },
        { populate: ["customization"] },
      );
      if (options.length !== selectedOptionIds.length) {
        throw new OptionNotFoundException();
      }

      const customizations = new Set([...options.map(o => o.customization)]);

      const orderedCustomizations = [...customizations].map(c => {
        const {
          description,
          optionCount,
          product: { id },
        } = c.getEntity();
        if (id !== p.id) {
          throw new InvalidCustomizationException();
        }
        const orderedCustomization = new OrderedCustomization({
          description,
          optionCount,
        });

        orderedCustomization.options = new Collection(
          orderedCustomization,
          options
            .filter(o => o.customization.id === c.id)
            .map(o => {
              return new SelectedOption({
                extraCost: o.extraCost,
                name: o.name,
              });
            }),
        );
        return orderedCustomization;
      });

      const orderedProduct = new OrderedProduct({
        amount,
        name: p.name,
        description: p.description,
        fullPrice: p.fullPrice,
        discountedPrice: p.discountedPrice,
        product: Reference.create(p as Product),
      });
      orderedProduct.customizations = new Collection(
        orderedProduct,
        orderedCustomizations,
      );

      return orderedProduct;
    });

    const order = new Order({
      requestedPickupTime: payload.requestedPickup,
      customer: user.customer,
      buffet,
      orderNumber: 10,
    });

    order.statusHistory = new Collection(order, [
      new OrderStatus(OrderStatusEnum.Placed, new Date(), payload.message),
    ]);
    order.products = new Collection(order, orderedProducts);

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

    const orders = await this.orderRepository.find({
      customer: { user: { id: customerId } },
    });

    return orders;
  }
}
