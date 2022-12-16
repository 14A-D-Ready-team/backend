import { Auth, AuthState, InjectAuthState } from "@/auth";
import { InvalidIdException } from "@/shared/exceptions";
import { NotFoundResponse, BadRequestResponse, ServiceUnavailableResponse, InternalServerErrorResponse } from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation/exceptions";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BuffetService } from "./buffet.service";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";

@Controller("buffet")
export class BuffetController {
  constructor(private readonly buffetService: BuffetService) {}

  @Post()
  @NotFoundResponse(BuffetNotFoundException)
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @Auth()
  public create(@Body() createBuffetDto: CreateBuffetDto, @InjectAuthState() authState: AuthState) {
    return this.buffetService.create(createBuffetDto, authState.user!);
  }

//   @Get()
//   @BadRequestResponse(InvalidDataException)
//   @ServiceUnavailableResponse()
//   @InternalServerErrorResponse()
//   public find(@Query() query: FilterProductsQuery) { // TODO
//     return this.buffetService.find(query);
//   }

  @Get(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public findOne(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.buffetService.findOne(+id);
  }

  @Patch(":id")
  @NotFoundResponse(BuffetNotFoundException)
  @BadRequestResponse(InvalidIdException, InvalidDataException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public update(
    @Param("id") id: string,
    @Body() updateBuffetDto: UpdateBuffetDto, 
  ) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.buffetService.update(+id, updateBuffetDto);
  }

  @Delete(":id")
  @BadRequestResponse(InvalidIdException)
  @InternalServerErrorResponse()
  @ServiceUnavailableResponse()
  public remove(@Param("id") id: string) {
    if (!+id) {
      throw new InvalidIdException();
    }
    return this.buffetService.remove(+id);
  }
}
