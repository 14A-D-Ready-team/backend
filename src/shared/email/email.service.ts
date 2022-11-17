import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail(): void {
    this.mailerService
      .sendMail({
        to: "fekete.miklos@students.jedlik.eu", // list of receivers
        from: "noreply.ready.team@gmail.com", // sender address
        subject: "Testing Nest MailerModule ✔", // Subject line
        text: "Szia uram!", // plaintext body
        html: "<b>Működik?</b>", // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
