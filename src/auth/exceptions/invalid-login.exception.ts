import { BadRequestException } from "@nestjs/common";

export class InvalidLoginException extends BadRequestException {}