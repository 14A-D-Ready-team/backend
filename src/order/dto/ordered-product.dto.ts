import { Expose } from "class-transformer";

export class OrderedProductDto {
  @Expose()
  public productId: number;

  @Expose()
  public amount: number;

  @Expose()
  public selectedOptionIds: number[];
}
