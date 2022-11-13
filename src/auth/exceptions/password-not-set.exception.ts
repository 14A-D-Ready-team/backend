import { BadRequestException } from "@nestjs/common";

export class PasswordNotSetException extends BadRequestException {}