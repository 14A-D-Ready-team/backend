import { EntityRepository } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/mysql";
import { EntityName } from "@mikro-orm/nestjs";
import { overrideRepositoryMethods } from "./utils";

export class BaseRepository<T extends object> extends EntityRepository<T> {
  constructor(_em: EntityManager, entityName: EntityName<T>) {
    super(_em, entityName);
    overrideRepositoryMethods(this);
  }
}
