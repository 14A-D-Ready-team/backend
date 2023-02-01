import { Auth, AuthState, InjectAuthState } from "@/auth";
import { BaseRepository } from "@/shared/database";
import { InvalidIdException } from "@/shared/exceptions";
import {
  NotFoundResponse,
  BadRequestResponse,
  ServiceUnavailableResponse,
  InternalServerErrorResponse,
} from "@/shared/swagger";
import { InvalidDataException } from "@/shared/validation/exceptions";
import { BuffetOwner, User } from "@/user";
import { Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { BuffetService } from "./buffet.service";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";
import { FilterBuffetsQuery } from "./filtered-buffets.query";

@Controller("buffet")
export class BuffetController {
  constructor(
    private readonly buffetService: BuffetService,
    @InjectRepository(User)
    private userRepository: BaseRepository<User>,
  ) {}

  @Post()
  @NotFoundResponse(BuffetNotFoundException)
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  @Auth()
  public async create(@Body() createBuffetDto: CreateBuffetDto) {

    //user létrehozása a testhez
    const user = new User();
    user.name = "asd";
    user.email = "assd@asd.com";
    user.password = "SupaS3cr3t!!!";
    user.type = 2;
    user.status = 0;
    user.buffetOwner = Reference.create(new BuffetOwner());

    await this.userRepository.persistAndFlush(user);
    
    return this.buffetService.create(createBuffetDto, user);
  }
  // public create(@Body() createBuffetDto: CreateBuffetDto, @InjectAuthState() authState: AuthState) {
  //   return this.buffetService.create(createBuffetDto, authState.user!);
  // }

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

  @Get()
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public find(@Query() query: FilterBuffetsQuery) {
    console.log(query);
    return this.buffetService.find(query);
  }

  // @Get("search")
  // @BadRequestResponse(InvalidDataException, InvalidJsonException)
  // @ServiceUnavailableResponse()
  // @InternalServerErrorResponse()
  // public search(@Query() query: SearchBuffetsQuery) {}

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
