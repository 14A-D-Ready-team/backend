import { registerAs } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export const emailConfig = registerAs("email", () => {
  return {
    transport: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
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
      dir: process.cwd() + "/templates/",
      //dir: "./email.templates",
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  } as MailerOptions;
});
