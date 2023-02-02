import { registerAs } from "@nestjs/config";

export const sessionConfig = registerAs("session", () => {
  return {
    secret: process.env.SESSION_SECRET || "",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      name: process.env.SESSION_COOKIE_NAME,
      maxAge:
        parseInt(process.env.SESSION_COOKIE_MAX_AGE_HR || "0") * 60 * 60 * 1000,
    },
    connectionString: process.env.MIKRO_ORM_CLIENT_URL,
    isRender: !!process.env.RENDER,
  };
});
