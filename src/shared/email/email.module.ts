import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { emailConfig } from "./email.config";
import { ConfigModule, ConfigType } from "@nestjs/config";

@Module({
  providers: [EmailService],
  imports: [
    MailerModule.forRootAsync({
      inject: [emailConfig.KEY],
      useFactory: (config: ConfigType<typeof emailConfig>) => {
        return config;
      },
      imports: [ConfigModule.forFeature(emailConfig)],
    }),
    ConfigModule.forFeature(emailConfig),
  ],
  exports: [EmailService],
})
export class EmailModule {}
