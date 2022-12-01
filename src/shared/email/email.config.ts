import { registerAs } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

export const emailConfig = registerAs("email", () => {
  //console.log(process.cwd());
  return {
    transport: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "465"),
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    defaults: {
      from: '"Ready Team" <noreply.ready.team@gmail.com>',
    },
    template: {
      dir: join(process.cwd(), "src/shared/email/templates/"),
      //dir: "./templates/",
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  } as MailerOptions;
});
