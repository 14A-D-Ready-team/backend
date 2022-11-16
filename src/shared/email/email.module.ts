import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";

@Module({
  providers: [EmailService],
  imports: [MailerModule.forRoot({})],
})
export class EmailModule {}
