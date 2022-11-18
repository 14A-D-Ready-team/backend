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
        //text vagy html?
        //text: "Szia uram!", // plaintext body
        html: "<b>Szia Uram!</b>", // HTML body content
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public sendWelcomeEmail(): void {
    this.mailerService
      .sendMail({
        to: "fekete.miklos@students.jedlik.eu", // list of receivers
        from: "noreply.ready.team@gmail.com", // sender address
        subject: "Ready! üdvözlés", // Subject line
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

  public sendEmailConfirmationEmail(): void {
    this.mailerService
      .sendMail({
        to: "fekete.miklos@students.jedlik.eu", // list of receivers
        from: "noreply.ready.team@gmail.com", // sender address
        subject: "Ready! email megerősítés", // Subject line
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

  public sendPwdResetEmail(): void {
    this.mailerService
      .sendMail({
        to: "fekete.miklos@students.jedlik.eu", // list of receivers
        from: "noreply.ready.team@gmail.com", // sender address
        subject: "Ready! jelszó visszaállítás", // Subject line
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
