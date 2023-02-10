import { registerAs } from "@nestjs/config";

export const sessionConfig = registerAs("session", () => {
  return {
    secret: process.env.SESSION_SECRET || "",
    cookie: {
      secure: process.env.SESSION_COOKIE_SECURE === "true",
      name: process.env.SESSION_COOKIE_NAME,
      maxAge:
        parseInt(process.env.SESSION_COOKIE_MAX_AGE_HR || "0") * 60 * 60 * 1000,
      domain: process.env.SESSION_COOKIE_DOMAIN,
    },
    connectionString: process.env.MIKRO_ORM_CLIENT_URL,
    isRender: process.env.RENDER === "true",
  };
});
