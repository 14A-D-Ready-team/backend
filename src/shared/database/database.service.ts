import { MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseService {
  constructor(private readonly orm: MikroORM) {}

  public async connect() {
    
      const connection = await this.orm.connect();
      const a = await this.orm.isConnected()
    console.log(a);
  }
}
