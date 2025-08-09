import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  const config = new DocumentBuilder()
      .setTitle('Gestion des Employes.')
      .setDescription('Gestion des Employes.')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Gestion des Employes')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4200',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Pour la connection a swagger:http://localhost:${PORT}/api`);
}
bootstrap();
