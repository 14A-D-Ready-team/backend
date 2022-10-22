import { MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class DatabaseService {
  constructor(private orm: MikroORM) {}

  public async rebuildDbSchema() {
    const schemaGenerator = this.orm.getSchemaGenerator();
    const dbName = this.orm.config.get("dbName");
    if (!dbName) {
      throw new Error("dbName is not defined in database config");
    }
    await schemaGenerator.dropDatabase(dbName);
    await schemaGenerator.createDatabase(dbName);
    await schemaGenerator.createSchema();
  }
}
