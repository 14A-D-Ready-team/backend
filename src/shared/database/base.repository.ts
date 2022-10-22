import { EntityRepository } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/mysql";
import { EntityName } from "@mikro-orm/nestjs";
import DbOfflineException from "./exceptions/db-offline.exception";

export default class BaseRepository<
  T extends object,
> extends EntityRepository<T> {
  constructor(_em: EntityManager, entityName: EntityName<T>) {
    super(_em, entityName);
    const methodsToOverride = [
      "persistAndFlush",
      "findOne",
      "findOneOrFail",
      "find",
      "findAndCount",
      "findAll",
      "removeAndFlush",
      "flush",
      "nativeInsert",
      "nativeUpdate",
      "nativeDelete",
      "populate",
      "count",
    ];

    methodsToOverride.forEach(m => {
      const originalMethod = this[m as keyof typeof this] as (
        ...args: unknown[]
      ) => unknown;
      console.log(originalMethod);
      this[m as keyof typeof this] = (async (...args: unknown[]) => {
        await this.checkConnection();
        return originalMethod(...args);
      }).bind(this) as this[keyof this];
    }, this);
  }

  public async checkConnection() {
    console.log("check");
    if (!(await this.em.getConnection().isConnected())) {
      throw new DbOfflineException();
    }
  }
}
