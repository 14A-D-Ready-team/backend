import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendTestEmail(): void {
    this.mailerService
      .sendMail({
        to: "redstone12@outlook.hu", // Miki emailje
        from: "noreply.ready.team@gmail.com", // sender address
        subject: "Testing Nest MailerModule ✔", // Subject line
        html: "<b>Szia Uram!</b>", // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public sendWelcomeEmail(receiverEmail: string): void {
    this.mailerService
      .sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! üdvözlés",
        html: "<b>Működik?</b>",
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public sendEmailConfirmationEmail(receiverEmail: string): void {
    this.mailerService
      .sendMail({
        to: receiverEmail,
        from: "noreply.ready.team@gmail.com",
        subject: "Ready! email megerősítés",
        html: "<b>Működik?</b>",
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
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
