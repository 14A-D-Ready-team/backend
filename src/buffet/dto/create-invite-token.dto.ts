import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateInviteTokenDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  public buffetId: number;
}
