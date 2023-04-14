import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import {
  HttpExceptionFilter,
  TransformableExceptionFilter,
  UnhandledExceptionFilter,
} from "@shared/exceptions";
import { CustomValidationPipe } from "@shared/validation";
import { AuthGuard } from "@/auth";
import { SerializerInterceptor } from "@shared/serialization";
import { PolicyGuard } from "./shared/policy";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { Logger } from "nestjs-pino";
import { loggingConfig } from "./shared/logging";
import { ConfigType } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const { usedLogger: useLogger } = app.get<ConfigType<typeof loggingConfig>>(
    loggingConfig.KEY,
  );

  if (useLogger === "pino") {
    app.useLogger(app.get(Logger));
  }

  const config = new DocumentBuilder()
    .setTitle("Ready App API")
    .setDescription("")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    explorer: true,
    swaggerOptions: {},
  });

  app.enableShutdownHooks();
  app.enableCors({
    credentials: true,
    origin: [
      "http://localhost:4200",
      "http://localhost:8100",
      "https://mobile.ready-app.hu",
      "https://www.ready-app.hu",
    ],
  });

  app.use(cookieParser());
  app.use(helmet());
  app.set("trust proxy", 1);
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(
    new UnhandledExceptionFilter(),
    new TransformableExceptionFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalGuards(app.get(AuthGuard), app.get(PolicyGuard));
  app.useGlobalInterceptors(app.get(SerializerInterceptor));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
