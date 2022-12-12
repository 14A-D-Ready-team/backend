import { Module } from "@nestjs/common";
import { BuffetService } from "./buffet.service";
import { BuffetController } from "./buffet.controller";

@Module({
  providers: [BuffetService],
  controllers: [BuffetController],
})
export class BuffetModule {}
