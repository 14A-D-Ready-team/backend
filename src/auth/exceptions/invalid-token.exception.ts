import { BadRequestException } from "@nestjs/common";

export class InvalidTokenException extends BadRequestException {}
