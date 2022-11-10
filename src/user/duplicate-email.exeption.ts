import { BadRequestException } from "@nestjs/common";

export class EmailDuplicateException extends BadRequestException {}
