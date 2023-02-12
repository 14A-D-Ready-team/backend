import { tmpdir } from "os";
import { join } from "path";

export const fileUploadConfig = {
  tempDir: join(tmpdir(), "ready-app-temp", "uploads"),
};
