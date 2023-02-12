import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { join } from "path";
import { finalize } from "rxjs/operators";
import rimraf from "rimraf";
import { fileUploadConfig } from "./file-upload.config";

@Injectable()
export class UploadCleanupInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      finalize(async () => {
        try {
          const res: Response = context.switchToHttp().getResponse();
          const timestamp = res.locals.uploadTimestamp;
          if (timestamp) {
            const path = join(fileUploadConfig.tempDir, timestamp);
            await rimraf(path);
          }
        } catch (e) {}
      }),
    );
  }
}
