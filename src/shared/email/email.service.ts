import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "@/user";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendWelcomeEmail(user: User, tokenId: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        template: "welcome",
        context: {
          name: user.name,
          token: tokenId,
          url: "https://www.ready-app.hu/api/auth/verify-user/" + tokenId,
          //url: "http://localhost:3000/auth/verify-user/" + tokenId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendConfirmEmail(user: User, tokenId: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! email megerősítés",
        template: "email-confirm",
        context: {
          name: user.name,
          token: tokenId,
          url: "https://www.ready-app.hu/api/auth/verify-user/" + tokenId,
          //url: "http://localhost:3000/auth/verify-user/" + tokenId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendPwdResetEmail(user: User, tokenId: string) {
    try {
      await this.mailerService.sendMail({
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
      await this.mailerService.sendMail({
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
