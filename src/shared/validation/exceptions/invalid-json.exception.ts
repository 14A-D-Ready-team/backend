import { BadRequestException } from "@nestjs/common";

export class InvalidJsonException extends BadRequestException {}
