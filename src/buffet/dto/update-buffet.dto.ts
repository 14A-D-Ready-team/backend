import { PartialType } from "@nestjs/swagger";
import { CreateBuffetDto } from "./create-buffet.dto";

export class UpdateBuffetDto extends PartialType(CreateBuffetDto) {}
