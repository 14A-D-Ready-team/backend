import { Expose, Type } from "class-transformer";

export class PaginatedResponse<T> {
  @Expose()
  @Type(args => {
    const items = (args?.object?.items as any[]) || [];
    if (items.length === 0) {
      return Object;
    }
    return items[0].constructor;
  })
  public items: T[];

  @Expose()
  public count: number;

  constructor(items: T[], count: number) {
    this.items = items;
    this.count = count;
  }
}
