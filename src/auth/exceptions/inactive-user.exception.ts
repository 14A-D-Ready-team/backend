import { BadRequestException } from "@nestjs/common";

export class InactiveUserException extends BadRequestException {}
