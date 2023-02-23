import { Auth, AuthState, InjectAuthState } from "@/auth";
import { BaseRepository } from "@/shared/database";
import { InvalidIdException } from "@/shared/exceptions";
import { CheckPolicies } from "@/shared/policy";
import { UploadCleanupInterceptor } from "@/shared/storage";
import {
  NotFoundResponse,
  BadRequestResponse,
  ServiceUnavailableResponse,
  InternalServerErrorResponse,
} from "@/shared/swagger";
import {
  InvalidDataException,
  InvalidJsonException,
} from "@/shared/validation/exceptions";
import { BuffetOwner, User } from "@/user";
import { Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BuffetService } from "./buffet.service";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { BuffetNotFoundException } from "./exception/buffet-not-found.exception";
import { SearchBuffetsQuery } from "./query";

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
  @UseInterceptors(FileInterceptor("image"), UploadCleanupInterceptor)
  @Auth()
  //TODO!!! megcsinálni jogokat
  @CheckPolicies(ability=>true)
  public create(
    @Body() createBuffetDto: CreateBuffetDto, 
    @InjectAuthState() authState: AuthState,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "image/*",
        })
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
    ) {
    return this.buffetService.create(createBuffetDto, authState.user!, image);
  }

  //getall search és rendezés is
  @Get()
  @BadRequestResponse(InvalidDataException)
  @ServiceUnavailableResponse()
  @InternalServerErrorResponse()
  public find(@Query() query: SearchBuffetsQuery) {
    console.log(query);
    return this.buffetService.find(query);
  }
  
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
