import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendWelcomeEmail(receiverEmail: string, tokenId: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        template: "welcome",
        html: `${tokenId}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendPwdResetEmail(receiverEmail: string, tokenId: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        html: `${tokenId}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendTestEmail(receiverEmail: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        template: "test",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //For testing only

  // public async sendEmailConfirm(receiverEmail: string, tokenId: string) {
  //   try {
  //     const sentEmail = await this.mailerService.sendMail({
  //       to: receiverEmail,
  //       from: "noreply.ready.team@gmail.com",
  //       subject: "Ready! üdvözlés",
  //       html: `${tokenId}`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
