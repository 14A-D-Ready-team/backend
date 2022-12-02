import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendTestEmail(receiverEmail: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        template: "test-email",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //send Email confirm az well
  public async sendWelcomeEmail(receiverEmail: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        html: "<b>Működik?</b>",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //For testing!!!

  public async sendEmailConfirm(receiverEmail: string, tokenId: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        html: `${tokenId}`,
        //TODO!!! Template /w token
      });
    } catch (error) {
      console.log(error);
    }
  }

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
