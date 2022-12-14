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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  app.enableCors();
  app.use(helmet());
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
