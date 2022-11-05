import { HttpException } from "@nestjs/common";

export abstract class TransformableException extends Error {
  public abstract toHttpError(): HttpException;
}
