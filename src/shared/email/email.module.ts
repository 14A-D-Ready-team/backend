import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { emailConfig } from "./email.config";

@Module({
  providers: [EmailService],
  imports: [MailerModule.forRoot(emailConfig)],
  exports: [EmailService],
})
export class EmailModule {}
