import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { authConfig, AuthModule } from "./auth";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@shared/database";
import { ValidationModule } from "@shared/validation";
import { UserModule } from "@/user";
import { TokenModule } from "@/token";
import { sessionConfig, SessionMiddleware } from "@shared/session";
import { SerializationModule } from "@shared/serialization";
import { emailConfig, EmailModule } from "@/shared/email";
import { PolicyModule } from "@/shared/policy";
import { AppAbilityFactory } from "./app-ability.factory";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { BuffetModule } from "./buffet/buffet.module";
import { LoggerModule } from "nestjs-pino";
import pino from "pino";
import { loggingConfig, LoggingModule } from "./shared/logging";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
      load: [authConfig, sessionConfig, emailConfig, loggingConfig],
    }),
    LoggingModule,
    SerializationModule,
    ValidationModule,
    PolicyModule,
    EmailModule,
    UserModule,
    TokenModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    BuffetModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppAbilityFactory],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes("*");
  }
}
