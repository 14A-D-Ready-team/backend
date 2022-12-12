import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "@/user";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendWelcomeEmail(user: User, tokenId: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: user.email,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        template: "welcome",
        context: {
          name: user.name,
          token: tokenId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendPwdResetEmail(user: User, tokenId: string) {
    try {
      const sentEmail = await this.mailerService.sendMail({
        to: user.email,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! jelszó csere",
        template: "reset-password",
        context: {
          name: user.name,
          token: tokenId,
        },
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
