import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Ready App API")
    .setDescription("")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  app.enableShutdownHooks();
  app.enableCors();
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
