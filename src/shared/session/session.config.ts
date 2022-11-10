import { registerAs } from "@nestjs/config";

export const sessionConfig = registerAs("session", () => {
  return {
    secret: process.env.SESSION_SECRET || "",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      name: process.env.SESSION_COOKIE_NAME,
    },
  };
});
