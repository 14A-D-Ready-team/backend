import { Injectable } from "@nestjs/common";
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from "@nestjs/platform-express";
import { join } from "path";
import { diskStorage } from "multer";
import { access, mkdir } from "fs";
import { promisify } from "util";
import { tmpdir } from "os";
import { fileUploadConfig } from "./storage.config";
import { Request, Response } from "express";

const existsAsync = function (path: string) {
  return new Promise<boolean>(resolve => access(path, err => resolve(!err)));
};

const mkdirAsync = promisify(mkdir);

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  public createMulterOptions(): MulterModuleOptions {
    const storage = diskStorage({ destination: this.destinationFactory });
    return { storage };
  }

  private async destinationFactory(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    let destination: string = tmpdir();
    try {
      const res = req.res;
      const timestamp: string = getUploadTimestamp(res);

      destination = join(fileUploadConfig.tempDir, timestamp);

      await ensureTempDirExists(destination);
    } catch (e) {
      return cb(e, destination);
    }
    cb(null, destination);
  }
}

function getUploadTimestamp(res?: Response) {
  const timestamp: string =
    res?.locals.uploadTimestamp || Date.now().toString();

  if (res) {
    res.locals.uploadTimestamp = timestamp;
  }
  return timestamp;
}

async function ensureTempDirExists(dest: string) {
  if (!(await existsAsync(dest))) {
    await mkdirAsync(dest, { recursive: true });
  }
}
