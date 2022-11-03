import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "@/auth/dto/registration.dto";
import { BaseRepository } from "@/shared/database";
import { User } from "./entity";
import { UserType, UserStatus } from "./enum";

@Injectable()
export class UserService {}
