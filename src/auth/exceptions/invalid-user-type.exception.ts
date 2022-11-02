import { BadRequestException } from "@nestjs/common";

export class InvalidUserTypeException extends BadRequestException {}
