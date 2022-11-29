import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendTestEmail(receiverEmail: string) {
    try {
      var sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        //html: "./templates/test-email.html",
        template: "test-email"
      });
    } catch (error) {
      console.log(error);
    }
  }

  //send Email confirm az well
  public async sendWelcomeEmail(receiverEmail: string) {
    try {
      var sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        html: "<b>Működik?</b>",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //TODO!!!   WHEN TOKENS ARE MADE

  // public sendPwdResetEmail(receiverEmail: string): void {
  //   this.mailerService
  //     .sendMail({
  //       to: receiverEmail,
  //       from: "noreply.ready.team@gmail.com",
  //       subject: "Ready! jelszó visszaállítás",
  //       text: "Szia uram!",
  //       html: "<b>Működik?</b>",
  //     })
  //     .then(success => {
  //       console.log(success);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
}
