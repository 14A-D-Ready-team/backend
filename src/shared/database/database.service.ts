import { MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseService {
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
    await schemaGenerator.execute(`
    SET FOREIGN_KEY_CHECKS = 0; 
    
    ALTER TABLE user MODIFY COLUMN id int UNSIGNED NOT NULL AUTO_INCREMENT ;

    SET FOREIGN_KEY_CHECKS = 1;`);
  }
}
