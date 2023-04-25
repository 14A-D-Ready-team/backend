import { InjectAuthState, AuthState } from "@/auth";
import {
  BadRequestResponse,
  ServiceUnavailableResponse,
  InternalServerErrorResponse,
} from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";
import { InvalidIdException } from "@/shared/exceptions";

@ApiTags("order")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/place")
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public place(
    @Body() payload: CreateOrderDto,
    @InjectAuthState() authState: AuthState,
  ) {
    return this.orderService.place(payload, authState.user!);
  }

  @Get(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public findOne(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.orderService.findOne(+id);
  }

  @Get(":customerId")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public getOrdersOfCustomer(@Param("customerId") customerId: string) {
    if (!+customerId) {
      throw new InvalidIdException();
    }
    return this.orderService.getOrdersOfCustomer(+customerId);
  }
}
